# Form-Create 使用指南

本文档详细说明了 Form-Create 系统的新功能和使用方法。

## 目录

1. [路由系统](#路由系统)
2. [AI 提示词管理](#ai-提示词管理)
3. [AI 数据提取](#ai-数据提取)
4. [表单模板市场](#表单模板市场)
5. [后端 API 集成](#后端-api-集成)
6. [系统设置](#系统设置)
7. [组件化使用](#组件化使用)

---

## 路由系统

### 概述

系统现在使用 Vue Router 实现了完整的路由管理，支持更好的页面导航和URL管理。

### 路由列表

- **`/`** - 表单列表主页
- **`/form/new`** - 创建新表单
- **`/form/:id/designer`** - 编辑表单设计
- **`/form/:id/data`** - 查看和管理表单数据
- **`/form/:id/data/:resultId`** - 查看单条数据详情
- **`/settings`** - 系统设置

### 存储模式配置

FormDesigner 和 FormDataView 组件现在支持通过 `storageMode` 属性指定数据存储方式：

- **localStorage**: 使用浏览器本地存储（默认）
- **api**: 使用后端 API

在 FormList 中使用示例：
```vue
<FormDesigner
  :storage-mode="appConfig.storageMode"
  :form="editingForm"
  @save="handleSaveForm"
/>

<FormDataView
  :storage-mode="appConfig.storageMode"
  :form="dataViewForm"
/>
```

---

## AI 提示词管理

### 概述

AI 提示词管理功能允许用户查看、编辑和测试用于数据提取的 AI 提示词。每个表单可以有自己的自定义提示词。

### 功能特性

1. **查看提示词**: 查看系统为表单生成的默认提示词
2. **Token 计数**: 实时显示提示词的 token 数量
3. **自定义编辑**: 用户可以修改提示词以提高提取准确度
4. **测试提取**: 在保存前测试提示词效果
5. **恢复默认**: 一键恢复到系统生成的默认提示词

### 使用方法

#### 1. 打开提示词编辑器

在任意表单的数据管理页面，点击「查看提示词」按钮。

#### 2. 查看和编辑

- **提示词内容**: 显示完整的提示词文本
- **Token 计数**: 显示估算的 token 数量
- **自定义标记**: 如果是自定义提示词，会显示绿色标记

#### 3. 生成默认提示词

点击「生成默认提示词」按钮，系统会根据表单 schema 重新生成默认提示词。此操作会覆盖当前内容。

#### 4. 测试提取

1. 点击「测试提取」按钮
2. 输入测试文本或上传测试文件
3. 查看提取结果
4. 根据结果调整提示词

#### 5. 保存提示词

编辑完成后，点击「保存提示词」按钮。提示词会保存到：
- 本地存储（localStorage）
- 后端 API（如果启用了 API 模式）

### Token 计算

系统使用简化的 token 计算方法：
- 中文字符：约 1.5 个 token
- 英文单词：约 1 个 token  
- 标点符号：约 0.5 个 token

实际 token 数量可能与 AI 模型的计算略有差异。

### API 集成

如果启用了后端 API，提示词会通过以下接口管理：

- `GET /api/forms/:id/prompt` - 获取自定义提示词
- `PUT /api/forms/:id/prompt` - 保存自定义提示词
- `DELETE /api/forms/:id/prompt` - 删除自定义提示词（恢复默认）

详见 [API.md](./API.md) 文档。

### 最佳实践

1. **先测试默认提示词**: 大多数情况下默认提示词已经足够好用
2. **小步调整**: 每次只修改提示词的一小部分，然后测试
3. **保持结构清晰**: 确保提示词中的字段描述和格式要求清晰
4. **使用示例**: 在提示词中提供示例输出格式
5. **定期优化**: 根据实际使用效果持续优化提示词

---

## AI 数据提取

### 概述

AI 数据提取功能允许您从文本内容中自动提取结构化数据，并填充到表单中。系统会根据表单的 schema 结构生成专业的提示词，确保提取的数据符合格式要求。

### 配置 AI 服务

1. 点击顶部工具栏的「设置」按钮
2. 切换到「AI服务」标签页
3. 启用 AI 服务开关
4. 配置以下参数：
   - **AI API地址**: OpenAI 兼容的 API 端点
     - 示例: `https://api.openai.com/v1/chat/completions`
   - **API密钥**: 您的 API 密钥
     - 示例: `sk-...`
   - **模型**: 使用的 AI 模型
     - 推荐: `gpt-3.5-turbo` 或 `gpt-4`

### 使用方法

1. 进入任意表单的数据管理页面
2. 点击「上传文件提取」按钮
3. 选择输入方式：
   - **上传文件**: 支持 .txt 文本文件
   - **输入文本**: 直接粘贴文本内容
4. 点击「提取数据」
5. 系统会自动分析内容并提取数据
6. 提取成功后，数据会自动添加到表单中

### 工作原理

1. **Schema 描述生成**: 系统将表单 schema 转换为自然语言描述
2. **提示词构建**: 生成严格的提示词，包含：
   - 字段说明和类型要求
   - 数据格式约束
   - JSON 结构示例
3. **AI 调用**: 将提示词和待提取内容发送给 AI 服务
4. **结果验证**: 验证返回的 JSON 数据是否符合 schema
5. **数据填充**: 将验证通过的数据添加到表单

### 示例

**表单 Schema:**
```json
[
  {
    "label": "姓名",
    "key": "name",
    "type": "input-short",
    "required": true
  },
  {
    "label": "邮箱",
    "key": "email",
    "type": "input-email",
    "required": true
  }
]
```

**输入文本:**
```
张三的邮箱是zhangsan@example.com
```

**提取结果:**
```json
{
  "name": "张三",
  "email": "zhangsan@example.com"
}
```

### 注意事项

- 未配置 AI 服务时，系统会使用模拟数据
- AI 提取结果可能不完全准确，建议人工审核
- 复杂嵌套结构的表单可能需要更强大的模型
- 注意保护 API 密钥，不要泄露给他人

---

## 表单模板市场

### 概述

表单模板市场提供了 20+ 个专业的预制表单模板，覆盖企业、教育、军工三大领域。您可以直接使用这些模板快速创建表单，无需从零开始设计。

### 打开模板市场

点击顶部工具栏的「模板市场」按钮，进入模板浏览界面。

### 模板分类

#### 🏢 企业模板 (8个)

1. **员工档案** - 员工基本信息登记表
   - 包含字段: 姓名、工号、性别、出生日期、手机号、邮箱、部门、职位等
   
2. **项目档案** - 项目基本信息和进度管理表
   - 包含字段: 项目名称、项目编号、项目经理、客户名称、预算、状态等
   
3. **产品档案** - 产品信息管理表
   - 包含字段: 产品名称、编号、类别、规格、价格、库存等
   
4. **合同信息** - 合同管理登记表
   - 包含字段: 合同编号、甲乙方、金额、签订日期、状态等
   
5. **财务信息** - 财务收支记录表
   - 包含字段: 单据编号、业务类型、科目、金额、付款方式等
   
6. **售后工单** - 售后服务工单管理表
   - 包含字段: 工单编号、客户名称、问题类型、优先级、状态等
   
7. **客户拜访** - 客户拜访记录表
   - 包含字段: 拜访对象、拜访日期、拜访目的、内容、后续计划等
   
8. **邀约管理** - 会议/活动邀约管理表
   - 包含字段: 邀约主题、类型、被邀约人、活动日期、状态等

#### 🎓 教育模板 (4个)

1. **作业** - 学生作业提交表
   - 包含字段: 作业标题、课程、学生信息、提交日期、成绩等
   
2. **信息填报** - 学生信息填报表
   - 包含字段: 学生姓名、学号、性别、学院、专业、联系方式等
   
3. **论文** - 学术论文信息登记表
   - 包含字段: 论文标题、类型、作者、指导教师、摘要、状态等
   
4. **考试成绩** - 考试成绩登记表
   - 包含字段: 考试名称、学生信息、成绩、等级等

#### 🛡️ 军工模板 (4个)

1. **情报抽取** - 情报信息抽取和分析表
   - 包含字段: 情报编号、类型、机密等级、来源、内容、分析评估等
   
2. **网络分析** - 网络安全分析和监控表
   - 包含字段: IP地址、端口、协议、攻击类型、威胁等级、处置措施等
   
3. **信息速递源** - 信息来源和速递管理表
   - 包含字段: 信息类别、来源、可信度、时效性、内容、分发范围等
   
4. **装备档案** - 军工装备信息管理表
   - 包含字段: 装备编号、名称、型号、状态、技术参数等

### 使用模板

1. 在模板市场中浏览或搜索所需模板
2. 点击模板卡片上的「预览」按钮查看详细信息
3. 点击「使用模板」按钮
4. 系统会自动创建一个新表单，包含模板的所有字段
5. 您可以进一步编辑和定制这个表单

### 搜索和筛选

- **搜索框**: 输入关键词搜索模板名称或描述
- **分类筛选**: 点击分类标签只显示该类别的模板
- **全部**: 显示所有可用模板

---

## 后端 API 集成

### 概述

Form-Create 支持两种数据存储模式：
1. **本地存储** (localStorage): 数据保存在浏览器中
2. **后端 API**: 数据保存到远程服务器

### 配置 API 服务

1. 点击顶部工具栏的「设置」按钮
2. 切换到「API服务」标签页
3. 启用 API 服务开关
4. 配置以下参数：
   - **API地址**: 后端 API 的基础 URL
     - 示例: `https://api.example.com`
   - **API密钥**: 用于认证的密钥（可选）
5. 点击「测试连接」验证配置是否正确
6. 点击「保存设置」

### 切换存储模式

1. 在设置对话框中切换到「存储设置」标签页
2. 选择存储模式：
   - **本地存储**: 适合个人使用和测试
   - **后端API**: 适合团队协作和生产环境
3. 点击「保存设置」

### API 接口规范

后端需要实现以下接口（详细文档见 `API.md`）：

**表单管理**
- `GET /api/forms` - 获取所有表单
- `GET /api/forms/:id` - 获取单个表单
- `POST /api/forms` - 创建表单
- `PUT /api/forms/:id` - 更新表单
- `DELETE /api/forms/:id` - 删除表单

**数据管理**
- `GET /api/forms/:id/results` - 获取表单数据
- `POST /api/forms/:id/results` - 创建数据
- `PUT /api/forms/:id/results/:resultId` - 更新数据
- `DELETE /api/forms/:id/results/:resultId` - 删除数据

**批量操作**
- `POST /api/forms/:id/results/batch` - 批量创建
- `DELETE /api/forms/:id/results/batch` - 批量删除

### 数据同步

系统会自动处理 localStorage 和 API 之间的同步：

- **启用 API 后**: 所有操作会先尝试 API，失败则使用本地存储
- **禁用 API 后**: 所有操作直接使用本地存储
- **数据迁移**: 需要手动将 localStorage 数据导出后导入到后端

---

## 系统设置

### 存储设置

**本地存储模式**
- 优点: 无需服务器，即开即用
- 缺点: 数据仅保存在当前浏览器，清除缓存会丢失数据
- 适用场景: 个人使用、快速测试

**API 存储模式**
- 优点: 数据持久化，支持多设备同步
- 缺点: 需要搭建后端服务
- 适用场景: 团队协作、生产环境

### API 服务设置

- **启用/禁用**: 控制是否使用后端 API
- **API 地址**: 后端服务的基础 URL
- **API 密钥**: 用于身份验证（可选）
- **测试连接**: 验证配置是否正确

### AI 服务设置

- **启用/禁用**: 控制是否使用 AI 数据提取
- **API 地址**: AI 服务的 API 端点
- **API 密钥**: AI 服务的认证密钥
- **模型**: 使用的 AI 模型名称

---

## 组件化使用

### 概述

Form-Create 采用模块化设计，所有功能都封装为独立的组件和服务，方便第三方集成使用。

### 核心模块

#### 1. 服务模块 (`src/services/`)

**AI 服务** (`aiService.js`)
```javascript
import { extractDataWithAI, generateSchemaDescription } from '@/services/aiService'

// 使用 AI 提取数据
const data = await extractDataWithAI(config, schema, content)
```

**API 服务** (`apiService.js`)
```javascript
import { apiService } from '@/services/apiService'

// 配置 API
apiService.configure({
  baseUrl: 'https://api.example.com',
  apiKey: 'your-key',
  enabled: true
})

// 使用 API
const forms = await apiService.getForms()
```

#### 2. 配置模块 (`src/config/`)

**应用配置** (`appConfig.js`)
```javascript
import { appConfig } from '@/config/appConfig'

// 读取配置
console.log(appConfig.storageMode) // 'localStorage' or 'api'
console.log(appConfig.ai.enabled)

// 更新配置
appConfig.setStorageMode('api')
appConfig.setAiConfig({ enabled: true, apiUrl: '...' })
```

#### 3. 模板模块 (`src/templates/`)

```javascript
import { 
  allTemplates, 
  getTemplatesByCategory,
  searchTemplates 
} from '@/templates'

// 获取所有模板
const templates = allTemplates

// 按分类获取
const enterpriseTemplates = getTemplatesByCategory('enterprise')

// 搜索模板
const results = searchTemplates('员工')
```

#### 4. 组件模块 (`src/components/`)

- `FormDesigner.vue` - 表单设计器
- `FormRenderer.vue` - 表单渲染器
- `FormPreview.vue` - 表单预览
- `FormDataView.vue` - 数据管理
- `TemplateMarket.vue` - 模板市场
- `SettingsDialog.vue` - 设置对话框

### 集成示例

#### 在 Vue 项目中使用

```vue
<template>
  <div>
    <!-- 使用模板市场 -->
    <TemplateMarket
      v-model:visible="showMarket"
      @select-template="handleSelectTemplate"
    />
    
    <!-- 使用表单设计器 -->
    <FormDesigner
      v-model:visible="showDesigner"
      :form="currentForm"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TemplateMarket from '@/components/TemplateMarket.vue'
import FormDesigner from '@/components/FormDesigner.vue'

const showMarket = ref(false)
const showDesigner = ref(false)
const currentForm = ref(null)

const handleSelectTemplate = (template) => {
  currentForm.value = {
    name: template.name,
    description: template.description,
    schema: template.schema
  }
  showDesigner.value = true
}

const handleSave = (formData) => {
  console.log('表单已保存:', formData)
}
</script>
```

#### 使用 Store

```javascript
import { formStore } from '@/stores/formStore'

// 创建表单
const newForm = await formStore.addForm({
  name: '我的表单',
  description: '描述',
  schema: [...]
})

// 获取表单
const form = formStore.getForm(formId)

// 添加数据
await formStore.addFormResult(formId, {
  field1: 'value1',
  field2: 'value2'
})
```

### 自定义扩展

#### 添加自定义模板

在 `src/templates/` 目录下创建新文件：

```javascript
// customTemplates.js
export const customTemplate = {
  name: '自定义模板',
  description: '我的自定义模板',
  category: 'custom',
  schema: [
    {
      label: '字段1',
      key: 'field1',
      type: 'input-short',
      required: true
    }
  ]
}

// 在 index.js 中导出
export { customTemplate } from './customTemplates'
```

#### 自定义字段类型

在 `src/utils/formUtils.js` 中扩展 `FIELD_TYPES`：

```javascript
export const FIELD_TYPES = {
  // 现有类型...
  
  // 自定义类型
  CUSTOM_TYPE: { 
    label: '自定义类型', 
    value: 'custom-type', 
    component: 'custom-component' 
  }
}
```

---

## 最佳实践

### 数据安全

1. **API 密钥**: 使用环境变量存储敏感信息
2. **HTTPS**: 生产环境必须使用 HTTPS
3. **定期备份**: 定期导出数据进行备份
4. **访问控制**: 在后端实施适当的访问控制

### 性能优化

1. **分页加载**: 大量数据时使用分页
2. **缓存策略**: 合理使用浏览器缓存
3. **懒加载**: 按需加载组件和数据
4. **压缩**: 生产环境启用 gzip 压缩

### 用户体验

1. **响应式设计**: 确保在不同设备上都能正常使用
2. **加载提示**: 异步操作时显示加载状态
3. **错误处理**: 提供清晰的错误提示
4. **数据验证**: 在客户端和服务端都进行数据验证

---

## 常见问题

### Q: AI 数据提取不准确怎么办？

A: 
- 尝试使用更强大的模型（如 GPT-4）
- 简化表单结构，避免过度嵌套
- 提供更清晰、结构化的输入文本
- 手动修正提取结果

### Q: 如何迁移 localStorage 数据到后端？

A:
1. 在本地存储模式下导出所有表单
2. 切换到 API 存储模式
3. 重新导入表单数据

### Q: 可以同时使用多个 AI 服务吗？

A: 当前版本只支持配置一个 AI 服务。如需支持多个服务，可以修改配置模块添加服务列表功能。

### Q: 模板可以编辑吗？

A: 从模板创建的表单可以随意编辑。模板本身是只读的，但您可以创建自定义模板。

---

## 技术支持

- **GitHub Issues**: https://github.com/jiuyuehe/form-create/issues
- **文档**: 项目根目录下的 README.md、API.md 等文件
- **示例代码**: 查看项目源代码中的注释和示例

---

## 更新日志

### v1.0.0 (2024-01-01)

**新功能**
- ✨ AI 智能数据提取
- ✨ 表单模板市场（20+ 模板）
- ✨ 后端 API 集成支持
- ✨ 系统配置管理
- ✨ 模块化架构重构

**改进**
- 🎨 优化用户界面
- ⚡ 提升性能
- 📝 完善文档

---

## 贡献指南

欢迎贡献代码、提交 bug 报告或提出新功能建议！

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

---

## 许可证

MIT License

Copyright (c) 2024 Form-Create

---

**感谢使用 Form-Create！**
