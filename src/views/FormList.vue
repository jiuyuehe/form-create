<template>
  <div class="form-list-container">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <h1>
          <el-icon><Document /></el-icon>
          表单管理系统
        </h1>
      </div>
      <div class="toolbar-right">
        <el-button type="primary" @click="handleCreateForm" :icon="Plus">
          创建表单
        </el-button>
        <el-button @click="handleDataAnalysis" :icon="DataAnalysis">
          数据分析
        </el-button>
      </div>
    </div>

    <!-- 表单卡片列表 -->
    <div class="cards-container">
      <el-empty v-if="formStore.forms.length === 0" description="暂无表单，点击创建表单开始">
        <el-button type="primary" @click="handleCreateForm">立即创建</el-button>
      </el-empty>
      
      <el-row :gutter="20" v-else>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="form in formStore.forms" :key="form.id">
          <el-card class="form-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span class="card-title">{{ form.name }}</span>
                <el-tag size="small">{{ form.schema.length }} 字段</el-tag>
              </div>
            </template>
            
            <div class="card-body">
              <p class="card-description">{{ form.description || '暂无描述' }}</p>
              <div class="card-meta">
                <el-text size="small" type="info">
                  <el-icon><Clock /></el-icon>
                  创建于: {{ formatDate(form.createdAt) }}
                </el-text>
              </div>
            </div>
            
            <template #footer>
              <div class="card-actions">
                <el-button size="small" @click="handlePreview(form)" :icon="View">
                  预览
                </el-button>
                <el-button size="small" @click="handleEdit(form)" :icon="Edit">
                  编辑
                </el-button>
                <el-button size="small" @click="handleViewData(form)" :icon="List">
                  数据
                </el-button>
                <el-popconfirm
                  title="确定要删除这个表单吗？"
                  @confirm="handleDelete(form.id)"
                >
                  <template #reference>
                    <el-button size="small" type="danger" :icon="Delete">
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
              </div>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 创建/编辑表单对话框 -->
    <FormDesigner
      v-model:visible="designerVisible"
      :form="editingForm"
      @save="handleSaveForm"
    />

    <!-- 预览表单对话框 -->
    <FormPreview
      v-model:visible="previewVisible"
      :form="previewForm"
    />

    <!-- 数据查看对话框 -->
    <FormDataView
      v-model:visible="dataViewVisible"
      :form="dataViewForm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formStore } from '../stores/formStore'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Plus,
  DataAnalysis,
  Document,
  View,
  Edit,
  List,
  Delete,
  Clock
} from '@element-plus/icons-vue'
import FormDesigner from '../components/FormDesigner.vue'
import FormPreview from '../components/FormPreview.vue'
import FormDataView from '../components/FormDataView.vue'

// 状态管理
const designerVisible = ref(false)
const previewVisible = ref(false)
const dataViewVisible = ref(false)
const editingForm = ref(null)
const previewForm = ref(null)
const dataViewForm = ref(null)

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 创建表单
const handleCreateForm = () => {
  editingForm.value = null
  designerVisible.value = true
}

// 编辑表单
const handleEdit = (form) => {
  editingForm.value = form
  designerVisible.value = true
}

// 预览表单
const handlePreview = (form) => {
  previewForm.value = form
  previewVisible.value = true
}

// 查看数据
const handleViewData = (form) => {
  dataViewForm.value = form
  dataViewVisible.value = true
}

// 删除表单
const handleDelete = (id) => {
  formStore.deleteForm(id)
  ElMessage.success('表单已删除')
}

// 保存表单
const handleSaveForm = (formData) => {
  if (editingForm.value) {
    // 更新表单
    formStore.updateForm(editingForm.value.id, formData)
    ElMessage.success('表单已更新')
  } else {
    // 创建新表单
    formStore.addForm(formData)
    ElMessage.success('表单已创建')
  }
  designerVisible.value = false
}

// 数据分析
const handleDataAnalysis = () => {
  const totalForms = formStore.forms.length
  const totalResults = Object.values(formStore.formResults).reduce((sum, results) => sum + results.length, 0)
  
  ElMessageBox.alert(
    `<div style="line-height: 1.8;">
      <p><strong>表单总数：</strong>${totalForms}</p>
      <p><strong>数据总数：</strong>${totalResults}</p>
      <p><strong>平均每表单数据：</strong>${totalForms > 0 ? (totalResults / totalForms).toFixed(2) : 0}</p>
    </div>`,
    '数据分析',
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '知道了'
    }
  )
}
</script>

<style scoped>
.form-list-container {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.toolbar {
  background: white;
  padding: 20px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.toolbar-left h1 {
  margin: 0;
  font-size: 24px;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 10px;
}

.toolbar-right {
  display: flex;
  gap: 10px;
}

.cards-container {
  padding: 20px 30px;
}

.form-card {
  margin-bottom: 20px;
  transition: transform 0.3s;
}

.form-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-weight: bold;
  font-size: 16px;
}

.card-body {
  min-height: 80px;
}

.card-description {
  color: #606266;
  margin-bottom: 10px;
  min-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 5px;
}

.card-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
