export const seed = {
  "measuringDevice": [
    {
      "id": 1,
      "device_code": "device code 1",
      "name": "name 1",
      "device_type": "DUE_SOON",
      "accuracy_level": "LOW",
      "owner_dept": "owner dept 1",
      "calibration_cycle_days": "calibration cycle days 1",
      "status": "DUE_SOON"
    },
    {
      "id": 2,
      "device_code": "device code 2",
      "name": "name 2",
      "device_type": "OVERDUE",
      "accuracy_level": "MEDIUM",
      "owner_dept": "owner dept 2",
      "calibration_cycle_days": "calibration cycle days 2",
      "status": "OVERDUE"
    },
    {
      "id": 3,
      "device_code": "device code 3",
      "name": "name 3",
      "device_type": "CALIBRATING",
      "accuracy_level": "HIGH",
      "owner_dept": "owner dept 3",
      "calibration_cycle_days": "calibration cycle days 3",
      "status": "VALID"
    }
  ],
  "standardInstrument": [
    {
      "id": 1,
      "standard_no": "STD-001",
      "name": "一等标准电阻",
      "specification": "0~100 Ω 0.01 级",
      "status": "AVAILABLE"
    },
    {
      "id": 2,
      "standard_no": "STD-002",
      "name": "标准压力表",
      "specification": "0~60 MPa 0.05 级",
      "status": "AVAILABLE"
    }
  ],
  "intermediateCheck": [
    {
      "id": 1,
      "check_no": "CHK-0001",
      "standard_no": "STD-001",
      "conclusion": "PASS",
      "operated_by": "quality-manager",
      "operated_at": "2026-08-20T09:00:00Z"
    }
  ],
  "calibrationPlan": [
    {
      "id": 1,
      "device_id": 1,
      "standard_id": 1,
      "planned_date": "2026-10-11T09:00:00Z",
      "plan_type": "PERIODIC",
      "priority": "HIGH",
      "status": "ASSIGNED",
      "assigned_vendor_id": 1,
      "created_by": "created by 1"
    },
    {
      "id": 2,
      "device_id": 2,
      "standard_id": 1,
      "planned_date": "2026-10-12T09:00:00Z",
      "plan_type": "PERIODIC",
      "priority": "MEDIUM",
      "status": "IN_PROGRESS",
      "assigned_vendor_id": 2,
      "created_by": "created by 2"
    },
    {
      "id": 3,
      "device_id": 3,
      "standard_id": 1,
      "planned_date": "2026-06-13T09:00:00Z",
      "plan_type": "PERIODIC",
      "priority": "LOW",
      "status": "CLOSED",
      "assigned_vendor_id": 3,
      "created_by": "created by 3"
    },
    {
      "id": 4,
      "device_id": 1,
      "standard_id": 2,
      "planned_date": "2026-10-18T09:00:00Z",
      "plan_type": "FIRST",
      "priority": "LOW",
      "status": "PLANNED",
      "assigned_vendor_id": 0,
      "created_by": "created by 1"
    }
  ],
  "calibrationCertificate": [
    {
      "id": 1,
      "device_id": 1,
      "plan_id": 1,
      "certificate_no": "certificate no 1",
      "result_status": "DUE_SOON",
      "valid_until": "valid until 1",
      "file_path": "file path 1",
      "issued_by": "issued by 1"
    },
    {
      "id": 2,
      "device_id": 2,
      "plan_id": 2,
      "certificate_no": "certificate no 2",
      "result_status": "OVERDUE",
      "valid_until": "valid until 2",
      "file_path": "file path 2",
      "issued_by": "issued by 2"
    },
    {
      "id": 3,
      "device_id": 3,
      "plan_id": 3,
      "certificate_no": "certificate no 3",
      "result_status": "VALID",
      "valid_until": "valid until 3",
      "file_path": "file path 3",
      "issued_by": "issued by 3"
    }
  ],
  "calibrationVendor": [
    {
      "id": 1,
      "vendor_name": "vendor name 1",
      "qualification_no": "qualification no 1",
      "contact_phone": "13800000001",
      "service_scope": "service scope 1",
      "vendor_status": "DUE_SOON"
    },
    {
      "id": 2,
      "vendor_name": "vendor name 2",
      "qualification_no": "qualification no 2",
      "contact_phone": "13800000002",
      "service_scope": "service scope 2",
      "vendor_status": "OVERDUE"
    },
    {
      "id": 3,
      "vendor_name": "vendor name 3",
      "qualification_no": "qualification no 3",
      "contact_phone": "13800000003",
      "service_scope": "service scope 3",
      "vendor_status": "VALID"
    }
  ],
  "overdueAlert": [
    {
      "id": 1,
      "device_id": 1,
      "plan_id": 1,
      "alert_level": "LOW",
      "alert_reason": "alert reason 1",
      "handled_by": "handled by 1",
      "handled_at": "2026-06-11T09:00:00Z",
      "status": "DUE_SOON"
    },
    {
      "id": 2,
      "device_id": 2,
      "plan_id": 2,
      "alert_level": "MEDIUM",
      "alert_reason": "alert reason 2",
      "handled_by": "handled by 2",
      "handled_at": "2026-06-12T09:00:00Z",
      "status": "OVERDUE"
    },
    {
      "id": 3,
      "device_id": 3,
      "plan_id": 3,
      "alert_level": "HIGH",
      "alert_reason": "alert reason 3",
      "handled_by": "handled by 3",
      "handled_at": "2026-06-13T09:00:00Z",
      "status": "VALID"
    }
  ]
};
