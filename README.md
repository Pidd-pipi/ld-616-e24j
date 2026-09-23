# 设备计量校准排期 API 服务

面向实验室和工厂的计量设备校准周期管理 API，覆盖设备台账、校准计划、证书、超期预警和外部机构管理。

## 快速启动

```bash
cp .env.example .env && docker compose up -d
```

## 访问地址或 CLI 示例

后端健康检查：<http://localhost:21116/health>

后端健康检查：<http://localhost:21116/health>


## 本地开发方式


- 后端：进入 `backend` 后按技术栈运行开发命令，接口统一挂在 `/api`。


## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | - |
| 后端 | NestJS + TypeScript + TypeORM |
| 数据库 | PostgreSQL 15 |
| 部署 | Docker Compose |

## 项目目录结构

```text

backend/src/routes, controllers, services, models, repositories, middlewares, constants, constructors, validators, utils, types, config
```

新增实体沿用同一分层：StandardInstrument / IntermediateCheck 各自贯穿 model、repository、service、controller、route、constructor（DTO 工厂）、type、constants，并在 `validators/intermediateCheckValidator.ts` 做入参校验。

## 环境变量说明

- `COMPOSE_PROJECT_NAME`: Compose 项目名，默认 `calibration-api`

- `BACKEND_PORT`: 后端端口，默认 `21116`
- `DB_PORT`: 数据库宿主机端口
- `DB_USER/DB_PASSWORD/DB_NAME`: 本地数据库凭据

## Docker 部署说明

- 根 Compose 文件不写 `version`，顶层 `name: calibration-api`。
- 容器名均使用 `${COMPOSE_PROJECT_NAME:-calibration-api}` 前缀。
- 数据库使用命名卷，避免绑定中文路径。
- 常见问题：端口占用时修改 `.env` 中端口后重启；需要重置数据时执行 `docker compose down -v`。

## 枚举/常量出现位置清单

- DeviceCalibrationStatus: constants/DeviceCalibrationStatus、types/DeviceCalibrationStatus、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- PlanStatus: constants/PlanStatus、types/PlanStatus、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- CertificateResult: constants/CertificateResult、types/CertificateResult、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- StandardStatus（AVAILABLE / DISABLED，计量标准器状态）：`constants/StandardStatus.ts`、`types/StandardStatus.ts`、`models/StandardInstrument.ts`、`repositories/StandardInstrumentRepository.ts`、`constructors/StandardInstrumentDtoFactory.ts`、`utils/formatters.ts`（formatStandardStatusText）、`services/IntermediateCheckService.ts`、`database/init.sql`(standard_instrument.status)、`seed.ts`。
- CheckConclusion（PASS / FAIL，期间核查结论）：`constants/CheckConclusion.ts`、`types/CheckConclusion.ts`、`models/IntermediateCheck.ts`、`repositories/IntermediateCheckRepository.ts`、`constructors/IntermediateCheckDtoFactory.ts`、`utils/formatters.ts`（formatCheckConclusionText）、`validators/intermediateCheckValidator.ts`、`services/IntermediateCheckService.ts`、`constants/errorMessages.ts`（CHECK_CONCLUSION_INVALID）、`database/init.sql`(intermediate_check.conclusion)、`seed.ts`。

## 计量标准器期间核查

计量室对在用计量标准器（StandardInstrument）开展期间核查（IntermediateCheck），接口挂在 `/api` 下：

| 方法与路径 | 说明 |
|---|---|
| `GET /api/standard-instrument` | 标准器台账 |
| `GET /api/standard-instrument/:standardNo` | 按标准器编号查询 |
| `POST /api/intermediate-check` | 提交一次期间核查 |
| `GET /api/intermediate-check/standard/:standardNo` | 按标准器编号查看核查记录与关联校准计划 |

提交体：`{ "standard_no", "check_no", "conclusion"(PASS/FAIL), "operated_by"?, "operated_at"? }`，记录标准器编号、核查编号、结论与操作时间（未传时间取服务端当前时间）。

业务规则：

1. **同一核查编号再次提交直接返回首次结论**（响应中 `duplicated: true`），不改动标准器状态和任何校准计划。
2. 核查结论 **不合格（FAIL）**：该标准器进入停用（DISABLED）状态；依赖它且尚未完成的校准计划退回待派（status=PLANNED、清空已派机构），受影响计划编号通过 `affected_plan_ids` / `returned_plan_ids` 返回；已签发证书（CERT_UPLOADED/CLOSED）及已取消计划保持原样。
3. **重新核查合格（PASS）**：标准器恢复可用（AVAILABLE）；退回待派的计划不会自动派发，仍由调度员决定何时派发（可在关联计划的 `pending_dispatch_plan_ids` 中查看）。
4. 按标准器编号可查看全部核查记录（含合格/不合格中文文案）和关联计划，`protected: true` 表示受证书保护、停用不影响的计划。

## 为什么会牵一发动全身

实体字段、枚举、日志模板、错误消息、构造器、筛选器和展示组件被刻意拆散到多个目录；修改一个状态值通常需要同步类型、构造器、服务、控制器、store、页面、README 与数据库种子。

## License

MIT
