import { Fixtures } from 'maha'

const expenseTypesFixtures = new Fixtures({
  tableName: 'expenses_expense_types',
  records: [
    {
      id: 1,
      team_id: 1,
      title: 'Staff Development-Registrations',
      description: 'Registration fee expense',
      integration: {
        expense_code: '55100',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 2,
      team_id: 1,
      title: 'Staff Development-Travel & Mileage',
      description: 'Travel and Mileage expense, including tolls.',
      integration: {
        expense_code: '55300',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 3,
      team_id: 1,
      title: 'Staff Development-Meals & Lodging',
      description: 'Meals and Lodging expense',
      integration: {
        expense_code: '55500',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 4,
      team_id: 1,
      title: 'Accounting and Auditing Fees',
      description: 'Cost of audits or other accounting services',
      integration: {
        expense_code: '60100',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 5,
      team_id: 1,
      title: 'Advertising',
      description: 'Cost of employment, or bid advertisements in newspapers and other publications.',
      integration: {
        expense_code: '60300',
        source_code: '51'
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 6,
      team_id: 1,
      title: 'Publicity',
      description: 'Expense of promoting the association services and programs. Includes costs of signs promotional material (shirts, caps, etc.), printing and advertising.',
      integration: {
        expense_code: '60500',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 7,
      team_id: 1,
      title: 'Association Services',
      description: 'Payments to Cornell University for assocation services',
      integration: {
        expense_code: '60700',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 8,
      team_id: 1,
      title: 'Awards and Prizes',
      description: 'Expenses for awards and prizes (4-H awards, scholarships, etc.) and for non-cash gifts to employees with a fair market value of less than $100.00. Non-cash gifts to employees with a fair market value of $100.00 or more, and all cash gifts regardless of amounts, must be reported through payroll.',
      integration: {
        expense_code: '60900',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 9,
      team_id: 1,
      title: 'Bank & Credit Card Fees',
      description: 'Expenses for bank services: credit card fees, etc.',
      integration: {
        expense_code: '61100',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 10,
      team_id: 1,
      title: 'Computer and IT Services',
      description: 'Expenses for computer and IT services and ACCPAC annual fee.',
      integration: {
        expense_code: '61300',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 11,
      team_id: 1,
      title: 'Contracted Services',
      description: 'Contract services for consulting, teaching, and other program delivery (such as contract services for horses in a camp program). Also includes use of temporary employment services.',
      integration: {
        expense_code: '61500',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 12,
      team_id: 1,
      title: 'Legal Fees',
      description: 'Cost of attorneyor other legal services',
      integration: {
        expense_code: '61700',
        source_code: '51'
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 13,
      team_id: 1,
      title: 'Outsourced Services',
      description: 'Used when servicdes such as bookkeeping , accounting, payroll is performed by another association',
      integration: {
        expense_code: '61900',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 14,
      team_id: 1,
      title: 'Specialist Contract',
      description: 'Expenses paid to Cornell for contracted services of Cornell Spcialist &/or Area Team',
      integration: {
        expense_code: '62100',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 15,
      team_id: 1,
      title: 'Employees Meals',
      description: 'Expenses for employees and volunteers to attend Association staff/volunteer meetings',
      integration: {
        expense_code: '62500',
        source_code: '51'
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 16,
      team_id: 1,
      title: 'Travel, Mileage, Tolls',
      description: 'Travel related expenses for association staff, Meals & Lodging board and volunteers while on Extension business. Includes mileage when using personal or fleet vehicles. Associations are encouraged to use the 00 portion of this account to segregate out the different individual components or combinations of these expenses, if needed.',
      integration: {
        expense_code: '62700',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 17,
      team_id: 1,
      title: 'Meetings, Food and Beverages',
      description: 'Expense of food for meetings and conferences, workshops, banquets.',
      integration: {
        expense_code: '62900',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 18,
      team_id: 1,
      title: 'Meetings, Other Expenses',
      description: 'Expenses for meetings (including annual meeting), conferences, workshops and banquets sponsored by the association. Would include rental of meeting place, AV equipment and other miscellaneous expenses. Cost of food would be recorded in 62900.',
      integration: {
        expense_code: '63100',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 19,
      team_id: 1,
      title: 'Postage & Express Delivery',
      description: 'Expenses for postage, freight and express.',
      integration: {
        expense_code: '63300',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 20,
      team_id: 1,
      title: 'Printing, Copying & Binding',
      description: 'Expenses for printing brochures, enrollment materials, signs, etc. Items not to be sold. Include cost of outside printing service.',
      integration: {
        expense_code: '63500',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 21,
      team_id: 1,
      title: 'Purchases of Small Equipment',
      description: 'Purchase of equipment costing under $1,000 Such as calculators, file cabinets, kitchen appliances, small tools.',
      integration: {
        expense_code: '63700',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 22,
      team_id: 1,
      title: 'Regional Program Support',
      description: 'Expenses for participation in inter-assocation regional programs.',
      integration: {
        expense_code: '63900',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 23,
      team_id: 1,
      title: 'Rental, Equipment',
      description: 'Lease/rental of equipment.',
      integration: {
        expense_code: '64100',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 24,
      team_id: 1,
      title: 'Rental, Facilities',
      description: 'Leases/rental of association facilities (meeting rooms, offices etc.)',
      integration: {
        expense_code: '64300',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 25,
      team_id: 1,
      title: 'Rental, Vehicles',
      description: 'Lease/rental of vehicles.',
      integration: {
        expense_code: '64400',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 26,
      team_id: 1,
      title: 'Grounds Maintenance',
      description: 'Cost of upkeep and repairs for buildings and land. Also includes expenses for janitorial, trash removal, snow plowing, cleaning supplies, paper towels, salt for ice removal, etc.',
      integration: {
        expense_code: '64500',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 27,
      team_id: 1,
      title: 'Repairs & Maintenance',
      description: 'Cost of maintenance agreements, and repair & maintenance expense on equipment, furniture & machinery.',
      integration: {
        expense_code: '64600',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 28,
      team_id: 1,
      title: 'Enterprise - Cost of Sales',
      description: 'Expenses for supplies, materials and postage from which association anticipates an equal return on its investment.',
      integration: {
        expense_code: '64700',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 29,
      team_id: 1,
      title: 'Fund Raising Expenses',
      description: 'Direct expenses for fund raising purposes such as cost of cookie sales, 4-H kits, food sold in food booths, etc. Do not include expenses related to the use of funds raised.',
      integration: {
        expense_code: '64800',
        source_code: '44'
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 30,
      team_id: 1,
      title: 'Special Events Expenses',
      description: 'Direct expenses for assocation (not program) fund raising activities.',
      integration: {
        expense_code: '64900',
        source_code: '45'
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 31,
      team_id: 1,
      title: 'Supplies: Nutritional',
      description: 'Nutrition supplies for EFNEP program, camp, etc.',
      integration: {
        expense_code: '65000',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 32,
      team_id: 1,
      title: 'Supplies: Teaching',
      description: 'Expenses for teaching materials and supplies to be used for projects and programs.',
      integration: {
        expense_code: '65200',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 33,
      team_id: 1,
      title: 'Supplies: Office',
      description: 'Expenses for office supplies such as paper, staples, file folders, tape, etc. Includes purchases of computer software programs.',
      integration: {
        expense_code: '65400',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 34,
      team_id: 1,
      title: 'Items for Resale',
      description: 'Cost of items for resale (4-H and Camp Store items).',
      integration: {
        expense_code: '65500',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 35,
      team_id: 1,
      title: 'Telecommunications',
      description: 'Expenses for telephones, fax, two-way radio. Includes expense of wide area network (WAN), and T1 charges.',
      integration: {
        expense_code: '65600',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 36,
      team_id: 1,
      title: 'Trips & Tours',
      description: 'Expenses for trips and tours sponsored by one or more associations.',
      integration: {
        expense_code: '65800',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 37,
      team_id: 1,
      title: 'Utilities',
      description: 'Expense of heating fuel, electricity, water, sewer, and natural gas.',
      integration: {
        expense_code: '66000',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 38,
      team_id: 1,
      title: 'Vehicles: Fuel',
      description: 'Fuel for association-owned vehicles.',
      integration: {
        expense_code: '66200',
        source_code: '51'
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 39,
      team_id: 1,
      title: 'Vehicles: Repairs & Maintenance',
      description: 'Maintenance and operation of association-owned vehicles.',
      integration: {
        expense_code: '66400',
        source_code: '51'
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 40,
      team_id: 1,
      title: 'Vehicles: Other',
      description: 'Includes inspections, toll and garage rent.',
      integration: {
        expense_code: '66600',
        source_code: '51'
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 41,
      team_id: 1,
      title: 'Insurance: Vehicles',
      description: 'Expense for automobile insurance coverage.',
      integration: {
        expense_code: '67000',
        source_code: '51'
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 42,
      team_id: 1,
      title: 'Insurance: General Liability',
      description: 'Expense for general liability insurance coverage.',
      integration: {
        expense_code: '67200',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 43,
      team_id: 1,
      title: 'Insurance: Property',
      description: 'Expense for real property liability coverage.',
      integration: {
        expense_code: '67400',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 44,
      team_id: 1,
      title: 'Insurance: Other',
      description: 'Expense for bond and equipment insurance coverage & Directors & Officers liability insurance coverage',
      integration: {
        expense_code: '67600',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.701Z',
      updated_at: '2017-10-24T18:33:08.701Z'
    },
    {
      id: 45,
      team_id: 1,
      title: 'Interest: Loans & Notes Payable',
      description: 'Interest paid on notes and installment loand and capital leases.',
      integration: {
        expense_code: '69100',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.702Z',
      updated_at: '2017-10-24T18:33:08.702Z'
    },
    {
      id: 46,
      team_id: 1,
      title: 'Interest: Other',
      description: 'Account used to record other interest expense such as interest charged for late payroll payment.',
      integration: {
        expense_code: '69300',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.702Z',
      updated_at: '2017-10-24T18:33:08.702Z'
    },
    {
      id: 47,
      team_id: 1,
      title: 'Subscriptions & Memberships',
      description: 'Subscriptions to periodicals and memberships in professional organizations.',
      integration: {
        expense_code: '69500',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.702Z',
      updated_at: '2017-10-24T18:33:08.702Z'
    },
    {
      id: 48,
      team_id: 1,
      title: 'Licenses & Fees',
      description: 'Inspection fees, background check fees and permits.',
      integration: {
        expense_code: '69600',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.702Z',
      updated_at: '2017-10-24T18:33:08.702Z'
    },
    {
      id: 49,
      team_id: 1,
      title: 'Taxes & Fines',
      description: 'Unrelated business income tax paid to the IRS &/or NYS.',
      integration: {
        expense_code: '69700',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.702Z',
      updated_at: '2017-10-24T18:33:08.702Z'
    },
    {
      id: 50,
      team_id: 1,
      title: 'Miscellaneous Expense',
      description: 'To be used only when no other expense account is available.',
      integration: {
        expense_code: '69800',
        source_code: null
      },
      created_at: '2017-10-24T18:33:08.702Z',
      updated_at: '2017-10-24T18:33:08.702Z'
    }
  ]
})

export default expenseTypesFixtures

