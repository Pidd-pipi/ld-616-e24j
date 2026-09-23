# 设备计量校准排期 API 服务

面向实验室和工厂的计量设备校准周期管理 API，覆盖设备台账、校准计划、证书、超期预警和外部机构管理。

## 快速启动

```bash
cp .env.example .env && docker compose up -d
```

## 访问地址或 CLI 示例

后端健康检查：<http://localhost:21116/health>

后端健康检查：<http://localhost:21116/health>

## 计量室标准器期间核查

计量室可对**计量标准器（MeasurementStandard）**发起期间核查（IntermediateCheck），接口挂在 `/api` 下：

- `POST /api/intermediate-check` 提交核查，入参记录：标准器编号 `standard_code`、核查编号 `check_no`、结论 `conclusion`（`PASS`/`FAIL`）、操作时间 `operated_at`（可缺省，服务端补当前时间）。
  - **同一核查编号再次提交直接返回首次结论**（响应中 `idempotent: true`），不改标准器状态和任何校准计划。
  - 核查 **不合格（FAIL）**：该标准器置为 `OUT_OF_SERVICE`（停用）；所有依赖它且**尚未完成**（`PLANNED/ASSIGNED/IN_PROGRESS`）的校准计划**退回待派**（状态回 `PLANNED`），受影响计划编号通过 `affected_plan_codes` 一并返回；**已签发证书保持原样**（`CERT_UPLOADED/CLOSED/CANCELLED` 计划与证书均不触碰）。
  - 重新核查 **合格（PASS）**：标准器恢复 `AVAILABLE`（可用）；退回待派的计划**仍停留在待派，由调度员决定何时派发**，服务不会自动重新派发。
- `GET /api/intermediate-check/standard/:standardCode` 按标准器编号查看该标准器的**核查记录和关联计划**。
- `GET/POST /api/measurement-standard` 标准器台账维护。

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

backend/src/routes, controllers, services, models, repositories, middlewares, constants, constructors, utils, types, config
```

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
- PlanStatus: constants/PlanStatus、types/PlanStatus、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。其中 `PLAN_PENDING_DISPATCH`（退回待派）与 `PLAN_UNFINISHED_STATUSES`（尚未完成）驱动期间核查的退回逻辑。
- CertificateResult: constants/CertificateResult、types/CertificateResult、constructors、logTemplates、errorMessages、筛选器、展示组件/控制器均有引用。
- MeasurementStandardStatus（AVAILABLE / OUT_OF_SERVICE）: constants/MeasurementStandardStatus、constants/statusText、types/MeasurementStandardPayload、models/MeasurementStandard、repositories/MeasurementStandardRepository、services/MeasurementStandardService、services/IntermediateCheckService、constructors/MeasurementStandardDtoFactory、validators/intermediateCheckValidator、utils/formatters、logTemplates、errorMessages、controllers、routes、database/init.sql。
- IntermediateCheckConclusion（PASS / FAIL）: constants/IntermediateCheckConclusion、constants/statusText、types/IntermediateCheckPayload、models/IntermediateCheck、repositories/IntermediateCheckRepository、services/IntermediateCheckService、constructors/IntermediateCheckDtoFactory、validators/intermediateCheckValidator、utils/formatters、logTemplates、errorMessages、controllers、routes、database/init.sql。

## 为什么会牵一发动全身

实体字段、枚举、日志模板、错误消息、构造器、筛选器和展示组件被刻意拆散到多个目录；修改一个状态值通常需要同步类型、构造器、服务、控制器、store、页面、README 与数据库种子。

## License

MIT
