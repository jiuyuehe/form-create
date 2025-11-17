# Form-Create 表单管理系统

基于 Vue3 + Element Plus 的 JSON Schema 表单生成器和数据管理系统。

![表单列表界面](https://github.com/user-attachments/assets/68c62dba-88a4-44cf-bffc-8dc66ae9be69)

## ✨ 功能特性

### 📝 表单设计器
- **可视化表单设计**：通过表格方式配置 JSON Schema
- **丰富的字段类型**：支持文本、数字、日期、选择、文件上传等多种字段类型
- **字段验证**：内置手机号、邮箱、IP地址等格式验证
- **嵌套对象**：支持对象类型，可以创建多层嵌套的表单结构
- **实时预览**：设计过程中可随时预览表单效果
- **Schema 导入导出**：支持 JSON 格式的 Schema 导入和导出，方便复用和分享

### 📊 数据管理
- **数据展示**：表格形式展示所有表单数据
- **CRUD 操作**：完整的数据增删改查功能
- **搜索功能**：支持全文搜索，快速定位数据
- **排序功能**：支持按任意字段排序
- **数据导出**：支持导出为 CSV 格式

### 🤖 AI 智能数据提取 ⭐ NEW
- **真实 AI 集成**：支持 OpenAI 及兼容 API
- **智能提示词生成**：自动根据表单 schema 生成专业提示词
- **严格格式约束**：确保提取数据符合 JSON schema 规范
- **文件上传**：支持上传文本文件进行数据提取
- **文本输入**：直接输入文本内容进行提取
- **数据验证**：自动验证提取结果的准确性
- **模拟模式**：未配置 AI 服务时使用模拟数据

### 🏪 表单模板市场 ⭐ NEW
- **20+ 专业模板**：覆盖企业、教育、军工三大领域
- **企业模板**：员工档案、项目档案、产品档案、合同信息、财务、售后工单、拜访、邀约
- **教育模板**：作业、信息填报、论文、考试成绩
- **军工模板**：情报抽取、网络分析、信息速递源、装备档案
- **快速搜索**：支持按名称和描述搜索模板
- **分类浏览**：按业务领域分类展示
- **一键使用**：快速基于模板创建表单

### 🔌 后端 API 集成 ⭐ NEW
- **双模式存储**：支持 localStorage 和后端 API 两种存储模式
- **完整的 API 接口**：表单 CRUD、数据 CRUD、批量操作等
- **灵活配置**：可随时切换存储模式
- **向后兼容**：保持对本地存储的完整支持
- **安全认证**：支持 API Key 认证

### 🎨 用户界面
- **精美设计**：基于 Element Plus 的现代化界面
- **响应式布局**：支持各种屏幕尺寸
- **中文界面**：完全中文化的用户界面
- **操作流畅**：友好的交互体验和操作提示
- **系统设置**：统一的配置管理界面

### 🧩 模块化架构 ⭐ NEW
- **组件化设计**：所有功能封装为独立组件
- **服务分离**：AI 服务、API 服务独立管理
- **配置中心**：统一的配置管理
- **易于集成**：方便第三方项目引入使用

## 🚀 快速开始

### 环境要求
- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📖 使用指南

### 1. 创建表单

1. 点击顶部工具栏的「创建表单」按钮
2. 填写表单名称和描述
3. 点击「添加字段」按钮添加表单字段
4. 为每个字段配置：
   - **字段标签**：显示给用户的字段名称
   - **字段Key**：数据存储的键名
   - **字段类型**：从下拉菜单选择字段类型
   - **默认值**：可选的默认值
   - **必填**：是否为必填字段
   - **占位符**：输入框的提示文本
5. 对于选择类型字段，点击「配置选项」添加选项
6. 对于对象类型字段，点击「配置子字段」添加嵌套字段
7. 点击「预览表单」查看效果
8. 点击「保存」完成创建

![表单设计器](https://github.com/user-attachments/assets/e0646902-d7b5-4ebc-9ac8-29e28f0ef813)

### 2. 管理数据

1. 在表单卡片上点击「数据」按钮进入数据管理界面
2. 点击「添加数据」手动添加一条数据
3. 使用搜索框搜索特定数据
4. 点击「编辑」修改数据内容
5. 点击「删除」删除数据（需确认）
6. 点击「导出数据」将数据导出为 CSV 文件

### 3. AI 数据提取

1. 在数据管理界面点击「上传文件提取」
2. 选择「上传文件」或「输入文本」标签页
3. 上传文件或输入文本内容
4. 点击「提取数据」
5. 系统将自动提取数据并添加到表单中

> **注意**：当前版本使用模拟数据。要使用真实的 AI 提取功能，需要接入 AI 服务。

### 4. Schema 导入导出

#### 导出 Schema
1. 在表单设计器中点击「导出Schema」
2. 系统会下载一个 JSON 文件

#### 导入 Schema
1. 在表单设计器中点击「导入Schema」
2. 选择之前导出的 JSON 文件
3. Schema 会自动加载到设计器中

## 🛠️ 支持的字段类型

### 输入类型
- **短文本** (input-short)：单行文本输入
- **长文本** (input-long)：多行文本输入（textarea）
- **数字** (input-number)：数字输入，支持增减按钮
- **手机号** (input-phone)：带格式验证的手机号输入
- **邮箱** (input-email)：带格式验证的邮箱输入
- **日期** (input-date)：日期选择器
- **日期时间** (input-datetime)：日期时间选择器
- **IP地址** (input-ip)：带格式验证的IP地址输入

### 选择类型
- **单选下拉** (select-single)：下拉菜单单选
- **多选下拉** (select-multiple)：下拉菜单多选
- **单选按钮** (radio)：单选按钮组
- **多选框** (checkbox)：多选框组

### 其他类型
- **文件上传** (file-upload)：文件上传组件
- **对象** (object)：嵌套对象，支持子字段

## 📁 项目结构

```
src/
├── views/              # 视图组件
│   └── FormList.vue   # 主列表视图
├── components/         # 可复用组件
│   ├── FormDesigner.vue     # 表单设计器
│   ├── FormRenderer.vue     # 表单渲染器
│   ├── FormPreview.vue      # 表单预览
│   ├── FormDataView.vue     # 数据查看
│   ├── TemplateMarket.vue   # 模板市场 ⭐ NEW
│   └── SettingsDialog.vue   # 系统设置 ⭐ NEW
├── stores/            # 状态管理
│   └── formStore.js   # 表单数据存储
├── services/          # 服务模块 ⭐ NEW
│   ├── aiService.js   # AI 数据提取服务
│   └── apiService.js  # 后端 API 服务
├── templates/         # 表单模板 ⭐ NEW
│   ├── enterpriseTemplates.js  # 企业模板
│   ├── educationTemplates.js   # 教育模板
│   ├── militaryTemplates.js    # 军工模板
│   └── index.js       # 模板汇总
├── config/            # 配置模块 ⭐ NEW
│   └── appConfig.js   # 应用配置
├── utils/             # 工具函数
│   └── formUtils.js   # 表单相关工具
├── App.vue            # 根组件
├── main.js            # 应用入口
└── style.css          # 全局样式
```

## 🔧 技术栈

- **前端框架**：Vue 3 (Composition API)
- **UI 组件库**：Element Plus 2.11.8
- **构建工具**：Vite 7.2.2
- **状态管理**：Vue Reactive API
- **数据持久化**：LocalStorage / 后端 API ⭐
- **图标**：Element Plus Icons
- **AI 集成**：OpenAI Compatible API ⭐

## 💡 核心设计思路

### 数据流转
```
模板选择 → 表单设计 → JSON Schema → 表单渲染 → 数据收集 → 
AI 提取 → 数据验证 → 数据存储（本地/API）→ 数据展示
```

### Schema 结构
```javascript
{
  "name": "表单名称",
  "description": "表单描述",
  "schema": [
    {
      "label": "字段标签",
      "key": "fieldKey",
      "type": "input-short",
      "defaultValue": "",
      "required": false,
      "placeholder": "请输入",
      "options": []  // 选择类型字段的选项
    }
  ]
}
```

### 数据结构
```javascript
{
  "id": "唯一标识",
  "formId": "表单ID",
  "data": {
    "fieldKey": "字段值"
  },
  "createdAt": "创建时间",
  "updatedAt": "更新时间"
}
```

## 📚 文档

- **[使用指南](GUIDE.md)** - 详细的功能使用说明
- **[API 文档](API.md)** - 后端 API 接口规范
- **README.md** - 本文档

## 🎯 后续优化方向

- [x] 集成真实的 AI 数据提取服务 ✅
- [x] 支持表单模板市场 ✅
- [x] 后端 API 集成 ✅
- [ ] 支持更多字段类型（URL、颜色选择器、富文本编辑器等）
- [ ] 添加字段间的条件显示逻辑
- [ ] 实现拖拽排序字段
- [ ] 添加数据可视化图表
- [ ] 实现多语言支持
- [ ] 添加用户权限管理
- [ ] 支持表单分页和步骤向导
- [ ] 添加表单主题自定义

## 🚀 快速配置指南

### 配置 AI 服务

1. 点击右上角「设置」按钮
2. 切换到「AI服务」标签
3. 启用 AI 服务并配置：
   - API 地址：`https://api.openai.com/v1/chat/completions`
   - API 密钥：您的 OpenAI API Key
   - 模型：`gpt-3.5-turbo` 或 `gpt-4`
4. 保存设置

### 配置后端 API

1. 点击右上角「设置」按钮
2. 切换到「API服务」标签
3. 启用 API 服务并配置：
   - API 地址：您的后端 API 基础 URL
   - API 密钥：认证密钥（可选）
4. 点击「测试连接」验证配置
5. 在「存储设置」中选择「后端API」模式

### 使用模板快速开始

1. 点击「模板市场」按钮
2. 浏览或搜索需要的模板
3. 点击「使用模板」创建表单
4. 根据需要修改表单字段
5. 开始收集数据

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 🌟 特别感谢

感谢所有为本项目做出贡献的开发者！

## 📧 联系方式

如有问题或建议，欢迎通过 Issue 与我们联系。
