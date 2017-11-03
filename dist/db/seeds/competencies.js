'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maha = require('maha');

var competenciesFixtures = new _maha.Fixtures({
  tableName: 'competencies_competencies',
  records: [{
    id: 1,
    team_id: 1,
    category_id: 1,
    title: 'Knows CCETC staff benefits',
    level: 1,
    description: 'Able to locate & use information re: staff benefits (including ongoing staff resources such as EAP, Wellness Program, etc.).',
    created_at: '2017-11-03T18:56:41.970Z',
    updated_at: '2017-11-03T18:56:41.970Z'
  }, {
    id: 2,
    team_id: 1,
    category_id: 1,
    title: 'Knows how to use shared office equipment',
    level: 1,
    description: 'Knows how to use office equipment and resources (phone; copier/scanner; fax; printers; online room equipment & van reservation systems; bicycle sign-outs).',
    created_at: '2017-11-03T18:56:41.971Z',
    updated_at: '2017-11-03T18:56:41.971Z'
  }, {
    id: 3,
    team_id: 1,
    category_id: 1,
    title: 'Familiar with physical environment of CCETC workplace',
    level: null,
    description: 'Familar with layout of CCETC Education Center.',
    created_at: '2017-11-03T18:56:41.971Z',
    updated_at: '2017-11-03T18:56:41.971Z'
  }, {
    id: 4,
    team_id: 1,
    category_id: 1,
    title: 'Knows basic HR, building and safety policies',
    level: null,
    description: 'Knows CCETCs basic HR, building and association-wide safety policies, and where to find information about them.',
    created_at: '2017-11-03T18:56:41.971Z',
    updated_at: '2017-11-03T18:56:41.971Z'
  }, {
    id: 5,
    team_id: 1,
    category_id: 1,
    title: 'Knows CCE mission, history and organizational structure',
    level: 1,
    description: 'Understands the mission, history and organizational structure of the CCE system generally, and CCETC in particular.',
    created_at: '2017-11-03T18:56:41.971Z',
    updated_at: '2017-11-03T18:56:41.971Z'
  }, {
    id: 6,
    team_id: 1,
    category_id: 1,
    title: 'Familiar with CCETC Strategic Plan',
    level: 1,
    description: 'Is aware of the CCETC Strategic Plan, understands key goals, and knows how ones individual work contributes to them.',
    created_at: '2017-11-03T18:56:41.971Z',
    updated_at: '2017-11-03T18:56:41.971Z'
  }, {
    id: 7,
    team_id: 1,
    category_id: 1,
    title: 'Conducts new staff orientation',
    level: 2,
    description: 'Understands the CCETC new staff orientation expectations, timelines & resources available. Can communicate that to others. Ensures team members complete required orientation and receive needed support.',
    created_at: '2017-11-03T18:56:41.971Z',
    updated_at: '2017-11-03T18:56:41.971Z'
  }, {
    id: 8,
    team_id: 1,
    category_id: 1,
    title: 'Orients new supervisors',
    level: 3,
    description: 'Understands CCETCs expectations, timeline & resources for new supervisor orientation. Can communicate that to others. Ensures new supervisors have required orientation and receive needed support.',
    created_at: '2017-11-03T18:56:41.971Z',
    updated_at: '2017-11-03T18:56:41.971Z'
  }, {
    id: 9,
    team_id: 1,
    category_id: 2,
    title: 'Knows CCETC risk management and other safety procedures',
    level: 1,
    description: 'Understands and can carry out CCETC policies and procedures re: building security, accident management and reporting, on-the-job driving, contracts and insurance, volunteers, photo release forms, permission forms and emergency action plan. Knows building layout, general emergency procedures, and who to contact in case of an emergency (during & after standard business hours). Knows who to contact concerning routine maintenance problems.',
    created_at: '2017-11-03T18:56:41.971Z',
    updated_at: '2017-11-03T18:56:41.971Z'
  }, {
    id: 10,
    team_id: 1,
    category_id: 2,
    title: 'Knows CCETC non-discrimination policies',
    level: 1,
    description: 'Understands and can communicate organizational non-discrimination policies (including CCETCs non-sexual harrassment and diversity & inclusion policies). Knows support resources available, who to contact with concerns, and what to do if concerns are not adequately addressed.',
    created_at: '2017-11-03T18:56:41.972Z',
    updated_at: '2017-11-03T18:56:41.972Z'
  }, {
    id: 11,
    team_id: 1,
    category_id: 2,
    title: 'Knows health-related staff support services',
    level: 1,
    description: 'Knows the support services available to staff members and how to access them (e.g., EAP, Family Leave, ADA & reasonable accommodation laws, etc.).',
    created_at: '2017-11-03T18:56:41.972Z',
    updated_at: '2017-11-03T18:56:41.972Z'
  }, {
    id: 12,
    team_id: 1,
    category_id: 2,
    title: 'Stress management skills',
    level: 1,
    description: 'Knows how to manage stress, maintain work/life balance, resolve workplace conflicts, and where to seek help if needed.',
    created_at: '2017-11-03T18:56:41.972Z',
    updated_at: '2017-11-03T18:56:41.972Z'
  }, {
    id: 13,
    team_id: 1,
    category_id: 2,
    title: 'Ensures safe working conditions for others on team',
    level: 2,
    description: 'Ensures team members have safe and appropriate working conditions (e.g., ergonomically appropriate work stations), and knows the CCETC resources available to assist in providing those.',
    created_at: '2017-11-03T18:56:41.972Z',
    updated_at: '2017-11-03T18:56:41.972Z'
  }, {
    id: 14,
    team_id: 1,
    category_id: 2,
    title: 'Ensures security of paper and electronic information',
    level: 2,
    description: 'Understands CCE policies and procedures re: the security of electronic information, and ensures compliance.',
    created_at: '2017-11-03T18:56:41.972Z',
    updated_at: '2017-11-03T18:56:41.972Z'
  }, {
    id: 15,
    team_id: 1,
    category_id: 2,
    title: 'Ensures workplace health and safety for all',
    level: 3,
    description: 'Assists program managers and supervisors with complex decision-making re: health and safety concerns. Develops policies and procedures for risk management and workplace safety. Ensures compliance.',
    created_at: '2017-11-03T18:56:41.973Z',
    updated_at: '2017-11-03T18:56:41.973Z'
  }, {
    id: 16,
    team_id: 1,
    category_id: 3,
    title: 'Successfully contributes to an inclusive organizational culture',
    level: 1,
    description: 'Interacts respectfully and appropriately with people from a wide variety of backgrounds & life experiences. Understands and adapts to cultural differences in communication, relational, presentational and other styles/preferences and norms. Is self-aware of own cultural styles/preferences and norms. Understand how ones own background (cultural, socio-economic, generational, educational, etc.) impacts how one perceives other people and situations. Regularly seeks out opportunities to learn about the histories, cultures, experiences, etc. of people from a wide variety of backgrounds & life experiences.',
    created_at: '2017-11-03T18:56:41.973Z',
    updated_at: '2017-11-03T18:56:41.973Z'
  }, {
    id: 17,
    team_id: 1,
    category_id: 3,
    title: 'Can build effective relationships with people from diverse backgrounds. Understands how achieving equity and inclusion requires a combination of personal behaviors, organizational practices, and institutionalized policies.',
    level: 2,
    description: 'Able to build trusted relationships with people from diverse cultural and economic background. Able to build trusted relationships with people from diverse cultural and economic background. Has sufficient knowledge of diverse cultural expectations and norms to be successful.',
    created_at: '2017-11-03T18:56:41.974Z',
    updated_at: '2017-11-03T18:56:41.974Z'
  }, {
    id: 18,
    team_id: 1,
    category_id: 3,
    title: 'Successfully hires and supervises staff from diverse backgrounds',
    level: 2,
    description: 'Recruits, hires/appoints, supervises and retains diverse staff and volunteers. Knows best practices for recruiting and hiring for diversity. Is aware of key areas of unaware bias in interviewing and ranking job candidates. Seeks diverse perspectives in creating recruiting and hiring processes.',
    created_at: '2017-11-03T18:56:41.974Z',
    updated_at: '2017-11-03T18:56:41.974Z'
  }, {
    id: 19,
    team_id: 1,
    category_id: 3,
    title: 'Integrates CCETC diversity goals into programming',
    level: 2,
    description: 'Develops innovative programming that meets a variety of community needs, experiences, and preferences. Understands and adapts to differing cultural norms in developing and delivering programming.',
    created_at: '2017-11-03T18:56:41.974Z',
    updated_at: '2017-11-03T18:56:41.974Z'
  }, {
    id: 20,
    team_id: 1,
    category_id: 3,
    title: 'Ensures an organizational culture supportive of diversity & inclusion',
    level: 2,
    description: 'Uses best practices for developing an inclusive organizational culture, supporting staff and volunteers to implement CCETCs diversity & inclusion goals, and ensuring accountability and success.',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 21,
    team_id: 1,
    category_id: 4,
    title: 'Has excellent customer-service skills',
    level: 1,
    description: 'Efficiently, effectively and positively assists other staff, volunteers & community members (e.g., providing information, collaborative problem-solving, sharing resources, etc.). Recognizes the diverse backgrounds of CCETC stakeholders and appropriately develops a respectful response to meet diverse needs.',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 22,
    team_id: 1,
    category_id: 5,
    title: 'Has good verbal communication skills',
    level: 1,
    description: 'Expresses thoughts clearly and logically. Transmits accurate, factual information. Shares ideas clearly to small groups in an informal setting. Understands and considers the needs of diverse users when responding to or initiating communication.',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 23,
    team_id: 1,
    category_id: 5,
    title: 'Has strong listening skills',
    level: 1,
    description: 'Has the ability to actively understand information provided by a speaker and verbally reflect and/or ask questions to demonstrate understanding. Can accept constructive feedback.',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 24,
    team_id: 1,
    category_id: 5,
    title: 'Has strong verbal communication skills',
    level: 2,
    description: 'Communicates complex ideas and processes in a clear and concise way. Can give constructive feedback.',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 25,
    team_id: 1,
    category_id: 5,
    title: 'Has appropriate communication skills in leadership roles',
    level: 2,
    description: 'Ability to effectively lead group communications and model appropriate communication methods.',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 26,
    team_id: 1,
    category_id: 5,
    title: 'Has good written communication skills',
    level: 1,
    description: 'Can write clear, concise, and grammatically correct emails, letters and memos. Can take effective meeting notes for oneself and assist with note-taking for others in team-meetings.',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 27,
    team_id: 1,
    category_id: 5,
    title: 'Has very good skills in communicating program related information',
    level: 2,
    description: 'Can write effective educational/informational material and reports in a variety of forms and media.',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 28,
    team_id: 1,
    category_id: 6,
    title: 'Can effectively present to groups of program participants',
    level: 1,
    description: 'Understands public speaking and presentation concepts. Clearly presents ideas to an audience and answers questions appropriately. Adjusts style and format of presentation based on audience.',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 29,
    team_id: 1,
    category_id: 6,
    title: 'Can plan presentations and engage audiences',
    level: 2,
    description: 'Plans and delivers communications that are impactful and persuasive. Delivers proactive communications on key issues. Creates a compelling presentation.',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 30,
    team_id: 1,
    category_id: 7,
    title: 'Knows CCETC financial policies and procedures',
    level: 1,
    description: 'Understands and can carry out CCETC financial policies and procedures (e.g., recording hours work, expense reporting, mail codes, cash handling, tax-exempt forms, out-of-pocket expense & mileage reimbursement, in-house supply charging, check and cash advance requests, and CCETC Visa card.).',
    created_at: '2017-11-03T18:56:41.975Z',
    updated_at: '2017-11-03T18:56:41.975Z'
  }, {
    id: 31,
    team_id: 1,
    category_id: 7,
    title: 'Explains CCETC financial policies and procedures to others',
    level: 2,
    description: 'Can explain CCETC financial policies and procedures appropriately to team members and ensure compliance. Knows how and when to approve staff hours in Kronos system.',
    created_at: '2017-11-03T18:56:41.976Z',
    updated_at: '2017-11-03T18:56:41.976Z'
  }, {
    id: 32,
    team_id: 1,
    category_id: 7,
    title: 'Develops budgets and track expenses',
    level: null,
    description: 'Able to develop and manage program budgets to accomplish program goals, track expenses and project accounts, read financial statements, and complete required budget reports. Knows where to find standard CCETC budget expenses such as fringe benefit, program support fees, etc.',
    created_at: '2017-11-03T18:56:41.976Z',
    updated_at: '2017-11-03T18:56:41.976Z'
  }, {
    id: 33,
    team_id: 1,
    category_id: 8,
    title: 'Writes successful grant proposals',
    level: 2,
    description: 'Able to identify relevant funding entities and to develop and write successful grant proposals. Knows how to research and identify appropriate funding prospects. Understands what funders are looking for in grant proposals. Understands the relationship-building aspects of the grant-making process. Knows the differences in applying for funding from private foundations, community foundations, government agencies, etc.',
    created_at: '2017-11-03T18:56:41.976Z',
    updated_at: '2017-11-03T18:56:41.976Z'
  }, {
    id: 34,
    team_id: 1,
    category_id: 8,
    title: 'Is able to plan and implement other financial resource development efforts',
    level: 2,
    description: 'Able to develop financial resources through fundraising campaigns, major donor development, business sponsorships, etc.',
    created_at: '2017-11-03T18:56:41.976Z',
    updated_at: '2017-11-03T18:56:41.976Z'
  }, {
    id: 35,
    team_id: 1,
    category_id: 8,
    title: 'Assists with financial decision-making',
    level: 3,
    description: 'Ensures development of easily accessed and up-to-date resources for standard CCETC budget expenses for use in budget planning and grantwriting. Assists staff with financial management issues and ensures compliance.',
    created_at: '2017-11-03T18:56:41.976Z',
    updated_at: '2017-11-03T18:56:41.976Z'
  }, {
    id: 36,
    team_id: 1,
    category_id: 8,
    title: 'Develops multi-program budgets and financial projections',
    level: 3,
    description: 'Carries out program area and association-wide budgeting, financial projections, and fiscal management.',
    created_at: '2017-11-03T18:56:41.976Z',
    updated_at: '2017-11-03T18:56:41.976Z'
  }, {
    id: 37,
    team_id: 1,
    category_id: 9,
    title: 'Effectively uses standard computer programs',
    level: 1,
    description: 'Effectively uses basic computer programs/applications (e.g., Word, Excel, Powerpoint) to accomplish project goals.',
    created_at: '2017-11-03T18:56:41.976Z',
    updated_at: '2017-11-03T18:56:41.976Z'
  }, {
    id: 38,
    team_id: 1,
    category_id: 9,
    title: 'Develops online information',
    level: 1,
    description: 'Understands how to develop and post content to social networking sites to reach target audiences.',
    created_at: '2017-11-03T18:56:41.976Z',
    updated_at: '2017-11-03T18:56:41.976Z'
  }, {
    id: 39,
    team_id: 1,
    category_id: 9,
    title: 'Can effectively teach online',
    level: 2,
    description: 'Can use web based media to deliver programs effectively.',
    created_at: '2017-11-03T18:56:41.977Z',
    updated_at: '2017-11-03T18:56:41.977Z'
  }, {
    id: 40,
    team_id: 1,
    category_id: 9,
    title: 'Can use job specific techology',
    level: 3,
    description: 'Understands and can effectively use highly specialized and job specific technology based tools, websites and software.',
    created_at: '2017-11-03T18:56:41.977Z',
    updated_at: '2017-11-03T18:56:41.977Z'
  }, {
    id: 41,
    team_id: 1,
    category_id: 10,
    title: 'Is able to use established systems for organizing own schedules and priorities',
    level: 1,
    description: 'Uses established systems to organize and track information (files, appointment calendars, etc…). Understands priorities and keeps clear records of completed and pending activities. Participates as a team member in planning and organizing information and project activities.',
    created_at: '2017-11-03T18:56:41.977Z',
    updated_at: '2017-11-03T18:56:41.977Z'
  }, {
    id: 42,
    team_id: 1,
    category_id: 10,
    title: 'Can assist others in organization',
    level: 2,
    description: 'Participates in developing streamlined systems to organize and track team/project information and activities. Sets priorities with an appropriate and realistic sense of the time demand involved. Assists others to build their planning & organization skills, and to analyze and evaluate progress towards goals and objectives. Assists others to set priorities to ensure manageable workloads.',
    created_at: '2017-11-03T18:56:41.977Z',
    updated_at: '2017-11-03T18:56:41.977Z'
  }, {
    id: 43,
    team_id: 1,
    category_id: 11,
    title: 'Can perform the necessary steps to accomplish program goals',
    level: 1,
    description: 'Effectively manages time, assignments, and priorities to accomplish project goals, and seeks help as needed.',
    created_at: '2017-11-03T18:56:41.977Z',
    updated_at: '2017-11-03T18:56:41.977Z'
  }, {
    id: 44,
    team_id: 1,
    category_id: 11,
    title: 'Can implement a program plan and lead others in implementing goals and budgets',
    level: 2,
    description: 'Leads a project team from implementation to completion, conceptualizes the phases of the project, creates a project timeline and budget, monitors and evaluates the project and uses the results for project improvement, and reports on project outcomes. Employs sound project management principles and procedures in the planning and implementation of programs and services.',
    created_at: '2017-11-03T18:56:41.978Z',
    updated_at: '2017-11-03T18:56:41.978Z'
  }, {
    id: 45,
    team_id: 1,
    category_id: 11,
    title: 'Can provide effective supervision to subordinate employees in project management',
    level: 2,
    description: 'Leads work team with clear direction and effective communication, assigns roles to individuals involved with the project based on peoples strengths and job duties, and assists team members to build time management and task management skills.',
    created_at: '2017-11-03T18:56:41.978Z',
    updated_at: '2017-11-03T18:56:41.978Z'
  }, {
    id: 46,
    team_id: 1,
    category_id: 11,
    title: 'Can implement a program plan and lead others in implementing goals and budgets.',
    level: 2,
    description: 'Leads a project team from implementation to completion, conceptualizes the phases of the project, creates a project timeline and budget, monitors and evaluates the project and uses the results for project improvement, and reports on project outcomes. Employs sound project management principles and procedures in the planning and implementation of programs and services.',
    created_at: '2017-11-03T18:56:41.978Z',
    updated_at: '2017-11-03T18:56:41.978Z'
  }, {
    id: 47,
    team_id: 1,
    category_id: 11,
    title: 'Ability to multitask the leadership of multiple projects.',
    level: 3,
    description: 'Effectively leads multiple simultaneous projects and multiple project teams. Anticipates and manages cascading impacts from changes to any single project. Strategically assesses and plans for potential opportunities, synergies and challeges within and between projects. Modifies project timelines and budgets in response to financial or environmental changes.',
    created_at: '2017-11-03T18:56:41.978Z',
    updated_at: '2017-11-03T18:56:41.978Z'
  }, {
    id: 48,
    team_id: 1,
    category_id: 11,
    title: 'Can appropriately delegate tasks and ensure completion.',
    level: 2,
    description: 'Effectively identifies and delegates tasks and projects to the appropriate staff and can provide the appropriate level of follow up and support to ensure success.',
    created_at: '2017-11-03T18:56:41.978Z',
    updated_at: '2017-11-03T18:56:41.978Z'
  }, {
    id: 49,
    team_id: 1,
    category_id: 12,
    title: 'Effectively works as part of a team',
    level: 1,
    description: 'Works effectively and respectfully with diverse groups of staff, volunteers and other stakeholders to accomplish goals. Develop goals in collaboration with others. Communicates appropriately and takes action within team as needed. Respects the ideas and opinions of others. Accepts and offers help when needed. Gives and accepts feedback in a positive manner.',
    created_at: '2017-11-03T18:56:41.978Z',
    updated_at: '2017-11-03T18:56:41.978Z'
  }, {
    id: 50,
    team_id: 1,
    category_id: 12,
    title: 'Effectively works as part of a diverse team',
    level: 1,
    description: 'Understands and values the strengths of all team members. Can effectively contribute to team outcomes by applying ones own strengths. Can appropriately draw upon the strengths of team members.',
    created_at: '2017-11-03T18:56:41.978Z',
    updated_at: '2017-11-03T18:56:41.978Z'
  }, {
    id: 51,
    team_id: 1,
    category_id: 12,
    title: 'Can effectively lead a diverse team and build a healthy team dynamic that values all contributors',
    level: 2,
    description: 'Understands, values and leverages the diversity of backgrounds, experiences, ideas and styles within the team to accomplish goals. Builds diverse, inclusive, effective teams to accomplish program goals. Encourages shared decision making and supports innovative ideas. Encourages cooperation, trust and group identity. Leads others to achieve team goals.',
    created_at: '2017-11-03T18:56:41.978Z',
    updated_at: '2017-11-03T18:56:41.978Z'
  }, {
    id: 52,
    team_id: 1,
    category_id: 12,
    title: 'Can effectively build and establish diverse new relationships and partnerships to further program efforts',
    level: 2,
    description: 'Develops collaborative relationships inside and outside CCETC to accomplish goals. Able to build trusted relationships with people from diverse cultural and economic backgrounds, and has sufficient knowledge of diverse cultural expectations and norms to be successful. Identifies and pursues opportunities to improve performance through partnerships. Balances autonomy and collaborative efforts to produce the best results.',
    created_at: '2017-11-03T18:56:41.978Z',
    updated_at: '2017-11-03T18:56:41.978Z'
  }, {
    id: 53,
    team_id: 1,
    category_id: 12,
    title: 'Conflict management & resolution',
    level: 3,
    description: 'Exhibits constructive conflict resolution skills. Facilitates win-win situations. Encourages inquiry and dialog.',
    created_at: '2017-11-03T18:56:41.978Z',
    updated_at: '2017-11-03T18:56:41.978Z'
  }, {
    id: 54,
    team_id: 1,
    category_id: 13,
    title: 'Ability to deliver program appropriate to the audience',
    level: 1,
    description: 'Uses adult and/or youth learning principles and incorporates different learning styles and preferences to effectively plan presentations. Creates culturally appropriate, impactful, comfortable learning environments to reach diverse audiences. Uses learner-centered facilitation techniques to manage group dialogue. Knows how to handle common facilitation challenges. (see also Verbal Communication).',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 55,
    team_id: 1,
    category_id: 13,
    title: 'Able to identify appropriate resources for program delivery',
    level: 1,
    description: 'Knowledgable about established materials and/or curricula to serve as a subject matter resource to participants and the public.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 56,
    team_id: 1,
    category_id: 13,
    title: 'Ability to adapt program to meet differences within the audience',
    level: 2,
    description: 'Creates culturally and age-relevant lesson plans and curricula to meet diverse community needs.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 57,
    team_id: 1,
    category_id: 14,
    title: 'Can administer evaluations designed by others',
    level: 1,
    description: 'Is able to administer evaluations effectively and appropriately.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 58,
    team_id: 1,
    category_id: 14,
    title: 'Can develop new evaluation tools',
    level: 2,
    description: 'Can develop new evaluation tools and guide administration of tools.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 59,
    team_id: 1,
    category_id: 14,
    title: 'Can analyze evaluation data and deliver results',
    level: 3,
    description: 'Analyses data from evaluations and can prepare presentations to deliver results to community members and constituents.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 60,
    team_id: 1,
    category_id: 15,
    title: 'Can perform a needs assessment',
    level: 2,
    description: 'Needs assessment; program planning tools (e.g., logic models); program evaluation methods and tools; reporting; marketing.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 61,
    team_id: 1,
    category_id: 15,
    title: 'Can help set program direction and create programs',
    level: 3,
    description: 'Helps set association direction in program area based on emerging community needs and statewide Plans of Work. Creates innovative educational programs and develops new educational strategies to meet diverse community needs and goals.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 62,
    team_id: 1,
    category_id: 15,
    title: 'Can create positive connections with faculty and other contributors to program',
    level: 3,
    description: 'Develops and maintains relationships with Cornell University faculty and staff, community leaders, and others.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 63,
    team_id: 1,
    category_id: 16,
    title: 'Can recruit, retain and supervise diverse volunteers appropriately',
    level: 1,
    description: 'Is able to identify and reach out to under-represented groups for volunteer opportunities, recruit them, and retain them as fully contributing members of program teams.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 64,
    team_id: 1,
    category_id: 16,
    title: 'Can provide guidance to volunteers',
    level: 1,
    description: 'Is able to effectively lead a group of volunteers in program activities, providing instruction and feedback on an ongoing basis.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 65,
    team_id: 1,
    category_id: 17,
    title: 'Can provide low complexity administrative tasks surrounding marketing and promotion of the program',
    level: 1,
    description: 'Is able to utilize existing program materials to create accurate and enticing descriptions for community members to view that will help them understand what the program offers and get them excited about participating.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 66,
    team_id: 1,
    category_id: 18,
    title: 'Can provide effective guidance to others',
    level: 1,
    description: 'Efficiently, effectively and positively directs/guides the work of diverse staff, volunteers & community members.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 67,
    team_id: 1,
    category_id: 18,
    title: 'Can effectively supervise and direct others',
    level: 2,
    description: 'Efficiently, effectively and positively supervises diverse teams of staff & volunteers . Offers constructive feedback to team members. Assists team members to manage workloads and set/accomplish goals. Ensures accountability. Helps team members develop appropriate professional improvement plans.',
    created_at: '2017-11-03T18:56:41.979Z',
    updated_at: '2017-11-03T18:56:41.979Z'
  }, {
    id: 68,
    team_id: 1,
    category_id: 18,
    title: 'Can effectively work from home',
    level: 1,
    description: 'Understands Cornell & CCETC policies re: working remotely and appropriately communicates policies to team members and effectively supervises those working off-site.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 69,
    team_id: 1,
    category_id: 18,
    title: 'Can resolve conflicts within the team',
    level: 3,
    description: 'Can solve problems and resolve conflicts that arise in operation of the program.  Is able to effectively mediate conflicts between two or more employees to provide long lasting improvements to team dynamics.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 70,
    team_id: 1,
    category_id: 18,
    title: 'Can effectively build and lead a team effort',
    level: 3,
    description: 'Is able to identify strengths in team members and build effective and collaborative projects, utilizing the diffences of the individuals to the advantage of all.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 71,
    team_id: 1,
    category_id: 18,
    title: 'Can provide supervision, guidance and leadership to other supervisors',
    level: 3,
    description: 'Efficiently, effectively and positively assists supervisors to build their skills and develop appropriate professional improvement plans. Identifies or develops adequate resources for supervisor development. Anticipates and plans for emerging supervisory needs and opportunities. Understands best practices for ensuring accountability across the association.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 72,
    team_id: 1,
    category_id: 18,
    title: 'Can assist staff to plan staff development opportunities',
    level: 2,
    description: 'Is able to lead staff and team in goal-setting and developing professional improvement plans, utilizing available resources, performance evaluations, and position descriptions.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 73,
    team_id: 1,
    category_id: 18,
    title: 'Can provide performance feedback & performance reviews',
    level: 2,
    description: 'Is able to effectively deliver effective ongoing feedback to employees and deliver annual performance evaluations that provide employees opportunities to improve and grow in their career goals and improve the program and team.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 74,
    team_id: 1,
    category_id: 18,
    title: 'Can effectively navigate CCE Tompkins hiring process',
    level: 2,
    description: 'Follows CCETCs current hiring practices and procedures. Knows where to find the appropriate forms for each stage of the hiring process.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 75,
    team_id: 1,
    category_id: 18,
    title: 'Knows how CCE Tompkins diversity mission fits into the hiring process',
    level: 2,
    description: 'Knows best practices for conducting effective hiring processes that align with CCETCs equity and inclusion commitments.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 76,
    team_id: 1,
    category_id: 18,
    title: 'Can effectively lead a recruitment effort for the team.',
    level: 2,
    description: 'Can lead a hiring initiative, including working with HR to begin recruitment, developing a search committee, conducting interviews, and selecting a candidate.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 77,
    team_id: 1,
    category_id: 19,
    title: 'Awareness of Personal Strengths and Values',
    level: 1,
    description: 'Knows one personal strengths (e.g., talents) and can use them to achieve desired work outcomes.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 78,
    team_id: 1,
    category_id: 19,
    title: 'Professionalism',
    level: 1,
    description: 'Understands and can demonstrate appropriate, \'professional\' behavior for the CCE setting.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 79,
    team_id: 1,
    category_id: 20,
    title: 'Be knowledgable of current developments and practices in agriculture',
    level: null,
    description: 'Attend conference sessions relevant to employees job or position.',
    created_at: '2017-11-03T18:56:41.980Z',
    updated_at: '2017-11-03T18:56:41.980Z'
  }, {
    id: 80,
    team_id: 1,
    category_id: 20,
    title: 'Be knowledgable of garden-based and horticulture education',
    level: null,
    description: 'Understands and can educate others on relevant horticulture content.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 81,
    team_id: 1,
    category_id: 20,
    title: 'Understands soil-testing procedures',
    level: null,
    description: 'Can properly obtain a soil sample to send to a soil-testing service in order to receive analysis and results.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 82,
    team_id: 1,
    category_id: 20,
    title: 'Pesticide Management',
    level: null,
    description: 'Understands the Cornell Pesticide Management Program and must be able to answer questions about training and certification of applicators.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 83,
    team_id: 1,
    category_id: 20,
    title: 'Program Work Team Participation',
    level: null,
    description: 'Participate in relevant program work teams if they are functioning and beneficial. Can gain insights for programming from participation.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 84,
    team_id: 1,
    category_id: 21,
    title: 'Knows energy background of Tompkins County and NYS',
    level: 1,
    description: 'Reads and understands Tompkins County Energy Roadmap, NYS 2050 energy policy, Energy and Economic Development Task Force report, etc.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 85,
    team_id: 1,
    category_id: 21,
    title: 'Knows essential energy principles',
    level: 1,
    description: 'Understands the essential principles and fundamental concepts for energy education.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 86,
    team_id: 1,
    category_id: 22,
    title: 'Knows transportation background of Tompkins County and NYS',
    level: 1,
    description: 'Reads and understands the Tompkins County transportation reports.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 87,
    team_id: 1,
    category_id: 23,
    title: 'Knows 4-H Youth Development Model',
    level: 1,
    description: 'Understands the basics of 4-H Youth Development Model.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 88,
    team_id: 1,
    category_id: 23,
    title: 'Knows elements of Positive Youth Development',
    level: 1,
    description: 'Understands Eight Essential Elements of Positive Youth Development.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 89,
    team_id: 1,
    category_id: 23,
    title: 'Knows Targeting Life Skills Model',
    level: 1,
    description: 'Understands Targeting Life Skills Model to design 4-H projects that address and develop various life skills.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 90,
    team_id: 1,
    category_id: 23,
    title: 'Knows the basics of Positive Youth Development',
    level: 1,
    description: 'Understands the definition and key principles of Positive Youth Development.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 91,
    team_id: 1,
    category_id: 23,
    title: 'Knows the basics of NYS 4-H',
    level: 1,
    description: 'Understands NYS 4-H mission, vision, and values.',
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 92,
    team_id: 1,
    category_id: 24,
    title: 'Knows how to maintain extreme confidentiality of information regarding all program participants',
    level: 1,
    description: null,
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 93,
    team_id: 1,
    category_id: 24,
    title: 'Knows how to facilitate effective and relevant educational lessons with target audiences in group settings',
    level: 1,
    description: null,
    created_at: '2017-11-03T18:56:41.981Z',
    updated_at: '2017-11-03T18:56:41.981Z'
  }, {
    id: 94,
    team_id: 1,
    title: 'Familiar with physical environment of CCETC workplace',
    level: 1,
    created_at: '2017-11-03T18:56:41.982Z',
    updated_at: '2017-11-03T18:56:41.982Z'
  }, {
    id: 95,
    team_id: 1,
    title: 'Knows basic HR, building and safety policies',
    level: 1,
    created_at: '2017-11-03T18:56:41.982Z',
    updated_at: '2017-11-03T18:56:41.982Z'
  }, {
    id: 96,
    team_id: 1,
    title: 'Understands CCETCs unwritten organizational culture',
    level: 1,
    created_at: '2017-11-03T18:56:41.982Z',
    updated_at: '2017-11-03T18:56:41.982Z'
  }, {
    id: 97,
    team_id: 1,
    title: 'Can build effective relationships with people from diverse backgrounds. Understands how achieving equity and inclusion requires a combination of personal behaviors, organizational practices, and institutionalized policies.',
    level: 1,
    created_at: '2017-11-03T18:56:41.982Z',
    updated_at: '2017-11-03T18:56:41.982Z'
  }, {
    id: 98,
    team_id: 1,
    title: 'Knows CCETC policies re: volunteers',
    level: 1,
    created_at: '2017-11-03T18:56:41.982Z',
    updated_at: '2017-11-03T18:56:41.982Z'
  }, {
    id: 99,
    team_id: 1,
    title: 'Can present information about programs and offerings to the public in a community/tabling forum',
    level: 1,
    created_at: '2017-11-03T18:56:41.982Z',
    updated_at: '2017-11-03T18:56:41.982Z'
  }, {
    id: 100,
    team_id: 1,
    title: 'Ability to make positive changes.',
    level: 1,
    created_at: '2017-11-03T18:56:41.982Z',
    updated_at: '2017-11-03T18:56:41.982Z'
  }, {
    id: 101,
    team_id: 1,
    title: 'Career Advancement',
    level: 1,
    created_at: '2017-11-03T18:56:41.982Z',
    updated_at: '2017-11-03T18:56:41.982Z'
  }, {
    id: 102,
    team_id: 1,
    title: 'Understands CCE Tompkins Strategic Plan',
    level: 2,
    created_at: '2017-11-03T18:56:41.986Z',
    updated_at: '2017-11-03T18:56:41.986Z'
  }, {
    id: 103,
    team_id: 1,
    title: 'Knows CCETC risk management and other safety procedures',
    level: 2,
    created_at: '2017-11-03T18:56:41.986Z',
    updated_at: '2017-11-03T18:56:41.986Z'
  }, {
    id: 104,
    team_id: 1,
    title: 'Able to direct others in risky situations',
    level: 2,
    created_at: '2017-11-03T18:56:41.986Z',
    updated_at: '2017-11-03T18:56:41.986Z'
  }, {
    id: 105,
    team_id: 1,
    title: 'Has good skills in communicating program related information',
    level: 2,
    created_at: '2017-11-03T18:56:41.986Z',
    updated_at: '2017-11-03T18:56:41.986Z'
  }, {
    id: 106,
    team_id: 1,
    title: 'Develops budgets and track expenses',
    level: 2,
    created_at: '2017-11-03T18:56:41.986Z',
    updated_at: '2017-11-03T18:56:41.986Z'
  }, {
    id: 107,
    team_id: 1,
    title: 'Develops online information',
    level: 2,
    created_at: '2017-11-03T18:56:41.986Z',
    updated_at: '2017-11-03T18:56:41.986Z'
  }, {
    id: 108,
    team_id: 1,
    title: 'Conflict management & resolution',
    level: 2,
    created_at: '2017-11-03T18:56:41.986Z',
    updated_at: '2017-11-03T18:56:41.986Z'
  }, {
    id: 109,
    team_id: 1,
    title: 'Can assist program leaders in developing marketing strategies',
    level: 2,
    created_at: '2017-11-03T18:56:41.986Z',
    updated_at: '2017-11-03T18:56:41.986Z'
  }, {
    id: 110,
    team_id: 1,
    title: 'Can effectively work from home',
    level: 2,
    created_at: '2017-11-03T18:56:41.986Z',
    updated_at: '2017-11-03T18:56:41.986Z'
  }, {
    id: 111,
    team_id: 1,
    title: 'Ensures appropriate staff orientation',
    level: 3,
    created_at: '2017-11-03T18:56:41.995Z',
    updated_at: '2017-11-03T18:56:41.995Z'
  }, {
    id: 112,
    team_id: 1,
    title: 'Develops strategic planning processes',
    level: 3,
    created_at: '2017-11-03T18:56:41.995Z',
    updated_at: '2017-11-03T18:56:41.995Z'
  }, {
    id: 113,
    team_id: 1,
    title: 'Ensures an organizational culture supportive of diversity & inclusion',
    level: 3,
    created_at: '2017-11-03T18:56:41.995Z',
    updated_at: '2017-11-03T18:56:41.995Z'
  }, {
    id: 114,
    team_id: 1,
    title: 'Can develop organizational systems for others',
    level: 3,
    created_at: '2017-11-03T18:56:41.995Z',
    updated_at: '2017-11-03T18:56:41.995Z'
  }, {
    id: 115,
    team_id: 1,
    title: 'Can serve as subject matter expert in field',
    level: 3,
    created_at: '2017-11-03T18:56:41.995Z',
    updated_at: '2017-11-03T18:56:41.995Z'
  }, {
    id: 116,
    team_id: 1,
    title: 'Able to perform high level administrative tasks in planning for communication and marketing efforts related to the program or position function',
    level: 3,
    created_at: '2017-11-03T18:56:41.995Z',
    updated_at: '2017-11-03T18:56:41.995Z'
  }, {
    id: 117,
    team_id: 1,
    title: 'Able to perform complex tasks related to organizational marketing efforts and communications',
    level: 3,
    created_at: '2017-11-03T18:56:41.995Z',
    updated_at: '2017-11-03T18:56:41.995Z'
  }]
});

exports.default = competenciesFixtures;