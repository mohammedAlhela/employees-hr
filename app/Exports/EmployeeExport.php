<?php

namespace App\Exports;

use App\Models\Employee;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;

class EmployeeExport implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents
{

    public function collection()
    {
        $employees = Employee::all();

        return $employees;
    }

    public function headings(): array
    {
        return [
            'Admission',
            'first_name',
            'last_name',
            'employee_type',
            'nationality',

            'gender',
            'date_of_birth',
            'local_mobile_number',
            'local_address',
            'emergency_number',

            'emergency_contact_name',
            'passport_number',
            'passport_expiry_date',
            'residency_number',
            'residency_expiry_date',


            'health_number',
            'health_renewal_date',
            'labour_contract',
            'labout_contract_issue_date',
            'labour_contract_expiry_date',

            'position',
            'position_date_of_joining',
            'position_branch_number',
            'based_at',
            'based_at_started_date',

            'based_at_current_status',


            'basic_salary',
            'salary_transportation',
            'salary_accommodation',
            'total_salary',


            'date_of_leaving',
            'reason_of_leaving',

            'created_at',
            'updated_at',







        ];
    }

    // ...

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $cellRange = 'A1:W1'; // All headers
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont('arial')->setSize(16);
            },

        ];
    }
}
