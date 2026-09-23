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
  "measurementStandard": [
    {
      "id": 1,
      "standard_code": "STD-001",
      "name": "多功能校准源",
      "specification": "5520A",
      "owner_dept": "计量室",
      "status": "AVAILABLE"
    },
    {
      "id": 2,
      "standard_code": "STD-002",
      "name": "数字多用表标准器",
      "specification": "8508A",
      "owner_dept": "计量室",
      "status": "AVAILABLE"
    }
  ],
  "calibrationPlan": [
    {
      "id": 1,
      "plan_code": "PLAN-001",
      "device_id": 1,
      "standard_code": "STD-001",
      "planned_date": "2026-06-11T09:00:00Z",
      "plan_type": "DUE_SOON",
      "priority": "priority 1",
      "status": "PLANNED",
      "assigned_vendor_id": 1,
      "created_by": "created by 1"
    },
    {
      "id": 2,
      "plan_code": "PLAN-002",
      "device_id": 2,
      "standard_code": "STD-001",
      "planned_date": "2026-06-12T09:00:00Z",
      "plan_type": "OVERDUE",
      "priority": "priority 2",
      "status": "ASSIGNED",
      "assigned_vendor_id": 2,
      "created_by": "created by 2"
    },
    {
      "id": 3,
      "plan_code": "PLAN-003",
      "device_id": 3,
      "standard_code": "STD-002",
      "planned_date": "2026-06-13T09:00:00Z",
      "plan_type": "CALIBRATING",
      "priority": "priority 3",
      "status": "IN_PROGRESS",
      "assigned_vendor_id": 3,
      "created_by": "created by 3"
    },
    {
      "id": 4,
      "plan_code": "PLAN-004",
      "device_id": 1,
      "standard_code": "STD-001",
      "planned_date": "2026-05-30T09:00:00Z",
      "plan_type": "CALIBRATING",
      "priority": "priority 4",
      "status": "CERT_UPLOADED",
      "assigned_vendor_id": 1,
      "created_by": "created by 4"
    }
  ],
  "intermediateCheck": [],
  "calibrationCertificate": [
    {
      "id": 1,
      "device_id": 1,
      "plan_id": 4,
      "certificate_no": "certificate no 1",
      "result_status": "PASS",
      "valid_until": "2027-05-30T09:00:00Z",
      "file_path": "file path 1",
      "issued_by": "issued by 1"
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
} as const;
