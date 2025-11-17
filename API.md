# API 接口文档

本文档说明了 Form-Create 系统与后端服务器集成所需的 API 接口规范。

## 基本信息

- **基础URL**: 可配置，例如 `https://api.example.com`
- **认证方式**: Bearer Token (可选)
- **数据格式**: JSON
- **编码**: UTF-8

## 认证

如果启用了 API 密钥认证，所有请求需要在 HTTP Header 中包含：

```
Authorization: Bearer YOUR_API_KEY
```

## 接口列表

### 1. 表单 Schema 管理

#### 1.1 获取所有表单

**请求**
```
GET /api/forms
```

**响应示例**
```json
[
  {
    "id": "1234567890",
    "name": "员工信息表",
    "description": "员工基本信息登记",
    "schema": [...],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 1.2 获取单个表单

**请求**
```
GET /api/forms/:id
```

**参数**
- `id`: 表单ID

**响应示例**
```json
{
  "id": "1234567890",
  "name": "员工信息表",
  "description": "员工基本信息登记",
  "schema": [
    {
      "label": "姓名",
      "key": "name",
      "type": "input-short",
      "required": true,
      "placeholder": "请输入姓名"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 1.3 创建表单

**请求**
```
POST /api/forms
Content-Type: application/json

{
  "name": "员工信息表",
  "description": "员工基本信息登记",
  "schema": [...]
}
```

**响应示例**
```json
{
  "id": "1234567890",
  "name": "员工信息表",
  "description": "员工基本信息登记",
  "schema": [...],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 1.4 更新表单

**请求**
```
PUT /api/forms/:id
Content-Type: application/json

{
  "name": "员工档案表",
  "description": "更新后的描述",
  "schema": [...]
}
```

**响应示例**
```json
{
  "id": "1234567890",
  "name": "员工档案表",
  "description": "更新后的描述",
  "schema": [...],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

#### 1.5 删除表单

**请求**
```
DELETE /api/forms/:id
```

**响应示例**
```json
{
  "success": true,
  "message": "表单已删除"
}
```

### 2. 表单数据结果管理

#### 2.1 获取表单的所有数据

**请求**
```
GET /api/forms/:formId/results
```

**参数**
- `formId`: 表单ID

**响应示例**
```json
[
  {
    "id": "9876543210",
    "formId": "1234567890",
    "data": {
      "name": "张三",
      "age": 30,
      "email": "zhangsan@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 2.2 获取单条数据

**请求**
```
GET /api/forms/:formId/results/:resultId
```

**参数**
- `formId`: 表单ID
- `resultId`: 数据ID

**响应示例**
```json
{
  "id": "9876543210",
  "formId": "1234567890",
  "data": {
    "name": "张三",
    "age": 30,
    "email": "zhangsan@example.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 2.3 创建表单数据

**请求**
```
POST /api/forms/:formId/results
Content-Type: application/json

{
  "data": {
    "name": "张三",
    "age": 30,
    "email": "zhangsan@example.com"
  }
}
```

**响应示例**
```json
{
  "id": "9876543210",
  "formId": "1234567890",
  "data": {
    "name": "张三",
    "age": 30,
    "email": "zhangsan@example.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 2.4 更新表单数据

**请求**
```
PUT /api/forms/:formId/results/:resultId
Content-Type: application/json

{
  "data": {
    "name": "张三",
    "age": 31,
    "email": "zhangsan@example.com"
  }
}
```

**响应示例**
```json
{
  "id": "9876543210",
  "formId": "1234567890",
  "data": {
    "name": "张三",
    "age": 31,
    "email": "zhangsan@example.com"
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

#### 2.5 删除表单数据

**请求**
```
DELETE /api/forms/:formId/results/:resultId
```

**响应示例**
```json
{
  "success": true,
  "message": "数据已删除"
}
```

### 3. 批量操作

#### 3.1 批量创建表单数据

**请求**
```
POST /api/forms/:formId/results/batch
Content-Type: application/json

{
  "results": [
    {
      "data": {
        "name": "张三",
        "age": 30
      }
    },
    {
      "data": {
        "name": "李四",
        "age": 25
      }
    }
  ]
}
```

**响应示例**
```json
{
  "success": true,
  "created": 2,
  "results": [...]
}
```

#### 3.2 批量删除表单数据

**请求**
```
DELETE /api/forms/:formId/results/batch
Content-Type: application/json

{
  "ids": ["id1", "id2", "id3"]
}
```

**响应示例**
```json
{
  "success": true,
  "deleted": 3
}
```

### 4. 导入导出

#### 4.1 导出表单 Schema

**请求**
```
GET /api/forms/:formId/export
```

**响应示例**
```json
{
  "name": "员工信息表",
  "description": "员工基本信息登记",
  "schema": [...],
  "version": "1.0.0"
}
```

#### 4.2 导入表单 Schema

**请求**
```
POST /api/forms/import
Content-Type: application/json

{
  "name": "员工信息表",
  "description": "员工基本信息登记",
  "schema": [...],
  "version": "1.0.0"
}
```

**响应示例**
```json
{
  "id": "1234567890",
  "name": "员工信息表",
  "description": "员工基本信息登记",
  "schema": [...],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 4.3 导出表单数据

**请求**
```
GET /api/forms/:formId/results/export?format=json
```

**参数**
- `format`: 导出格式 (json, csv)

**响应示例 (JSON)**
```json
[
  {
    "id": "9876543210",
    "data": {
      "name": "张三",
      "age": 30
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 5. AI 数据提取（可选）

如果后端实现了 AI 数据提取功能，可以提供此接口。

**请求**
```
POST /api/forms/:formId/extract
Content-Type: application/json

{
  "content": "张三，30岁，邮箱zhangsan@example.com",
  "mode": "text"
}
```

**响应示例**
```json
{
  "success": true,
  "data": {
    "name": "张三",
    "age": 30,
    "email": "zhangsan@example.com"
  }
}
```

### 6. AI 提示词管理（可选）

用于管理每个表单的自定义AI提示词。

#### 6.1 获取表单提示词

**请求**
```
GET /api/forms/:formId/prompt
```

**参数**
- `formId`: 表单ID

**响应示例**
```json
{
  "prompt": "你是一个专业的数据提取助手...",
  "isCustom": true,
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**说明**
- 如果该表单没有自定义提示词，返回 404 或空响应
- 前端会根据表单schema自动生成默认提示词

#### 6.2 保存自定义提示词

**请求**
```
PUT /api/forms/:formId/prompt
Content-Type: application/json

{
  "prompt": "自定义的提示词内容..."
}
```

**响应示例**
```json
{
  "success": true,
  "prompt": "自定义的提示词内容...",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### 6.3 删除自定义提示词（恢复默认）

**请求**
```
DELETE /api/forms/:formId/prompt
```

**响应示例**
```json
{
  "success": true,
  "message": "已恢复默认提示词"
}
```

## 错误响应

所有接口在出错时应返回统一格式的错误响应：

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述信息"
  }
}
```

**常见错误码**
- `INVALID_REQUEST`: 请求参数无效
- `NOT_FOUND`: 资源不存在
- `UNAUTHORIZED`: 未授权
- `FORBIDDEN`: 禁止访问
- `INTERNAL_ERROR`: 服务器内部错误

**HTTP 状态码**
- `200`: 成功
- `201`: 创建成功
- `400`: 请求错误
- `401`: 未授权
- `403`: 禁止访问
- `404`: 资源不存在
- `500`: 服务器错误

## 实现建议

### 数据库设计

**forms 表**
```sql
CREATE TABLE forms (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  schema JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**form_results 表**
```sql
CREATE TABLE form_results (
  id VARCHAR(50) PRIMARY KEY,
  form_id VARCHAR(50) NOT NULL,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE
);
```

### 安全建议

1. **认证和授权**: 使用 JWT 或 API Key 进行认证
2. **输入验证**: 验证所有输入数据，防止 SQL 注入和 XSS 攻击
3. **HTTPS**: 生产环境必须使用 HTTPS
4. **CORS**: 配置正确的 CORS 策略
5. **速率限制**: 实施 API 速率限制，防止滥用
6. **数据加密**: 敏感数据应加密存储

### 性能优化

1. **分页**: 对于数据列表接口，建议实现分页
2. **缓存**: 使用 Redis 等缓存常用数据
3. **索引**: 为常用查询字段添加数据库索引
4. **异步处理**: 对于耗时操作（如AI提取），使用异步处理

## 测试工具

可以使用以下工具测试 API：

- **Postman**: 图形化接口测试工具
- **curl**: 命令行工具
- **Insomnia**: REST API 客户端

### curl 示例

```bash
# 获取所有表单
curl -X GET https://api.example.com/api/forms \
  -H "Authorization: Bearer YOUR_API_KEY"

# 创建表单
curl -X POST https://api.example.com/api/forms \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试表单",
    "description": "这是一个测试",
    "schema": []
  }'
```

## 联系方式

如有问题或建议，请通过 GitHub Issues 联系我们。
