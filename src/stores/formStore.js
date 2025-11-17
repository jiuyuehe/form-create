// 表单数据管理存储
import { reactive, watch } from 'vue'

// 从 localStorage 加载数据
const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('加载数据失败:', error)
    return defaultValue
  }
}

// 保存数据到 localStorage
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('保存数据失败:', error)
  }
}

// 全局状态
export const formStore = reactive({
  // 表单模板列表
  forms: loadFromStorage('forms', []),
  
  // 表单数据结果集
  formResults: loadFromStorage('formResults', {}),
  
  // 添加新表单
  addForm(form) {
    const newForm = {
      id: Date.now().toString(),
      name: form.name || '未命名表单',
      description: form.description || '',
      schema: form.schema || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.forms.push(newForm)
    // 初始化该表单的结果集
    this.formResults[newForm.id] = []
    return newForm
  },
  
  // 更新表单
  updateForm(id, updates) {
    const index = this.forms.findIndex(f => f.id === id)
    if (index !== -1) {
      this.forms[index] = {
        ...this.forms[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
    }
  },
  
  // 删除表单
  deleteForm(id) {
    const index = this.forms.findIndex(f => f.id === id)
    if (index !== -1) {
      this.forms.splice(index, 1)
      delete this.formResults[id]
    }
  },
  
  // 获取表单
  getForm(id) {
    return this.forms.find(f => f.id === id)
  },
  
  // 添加表单数据结果
  addFormResult(formId, result) {
    if (!this.formResults[formId]) {
      this.formResults[formId] = []
    }
    const newResult = {
      id: Date.now().toString(),
      formId,
      data: result,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.formResults[formId].push(newResult)
    return newResult
  },
  
  // 更新表单数据结果
  updateFormResult(formId, resultId, data) {
    if (this.formResults[formId]) {
      const index = this.formResults[formId].findIndex(r => r.id === resultId)
      if (index !== -1) {
        this.formResults[formId][index] = {
          ...this.formResults[formId][index],
          data,
          updatedAt: new Date().toISOString()
        }
      }
    }
  },
  
  // 删除表单数据结果
  deleteFormResult(formId, resultId) {
    if (this.formResults[formId]) {
      const index = this.formResults[formId].findIndex(r => r.id === resultId)
      if (index !== -1) {
        this.formResults[formId].splice(index, 1)
      }
    }
  },
  
  // 获取表单的所有结果
  getFormResults(formId) {
    return this.formResults[formId] || []
  },
  
  // 导出表单 schema
  exportSchema(formId) {
    const form = this.getForm(formId)
    if (form) {
      return {
        name: form.name,
        description: form.description,
        schema: form.schema,
        version: '1.0.0'
      }
    }
    return null
  },
  
  // 导入表单 schema
  importSchema(schemaData) {
    return this.addForm({
      name: schemaData.name || '导入的表单',
      description: schemaData.description || '',
      schema: schemaData.schema || []
    })
  }
})

// 监听状态变化并持久化到 localStorage
watch(() => formStore.forms, (newForms) => {
  saveToStorage('forms', newForms)
}, { deep: true })

watch(() => formStore.formResults, (newResults) => {
  saveToStorage('formResults', newResults)
}, { deep: true })
