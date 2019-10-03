export const employee = [
  {
    section: 'position',
    name: 'employee_position_description',
    label: 'Position Description',
    instructions: 'Is the Positions Description up to date? If not, note any changes to your duties over the review period and any items within the existing position description that may need revision.'
  }, {
    section: 'self',
    name: 'accomplishments',
    label: 'Accomplishments',
    instructions: 'Please note your “greatest successes” or “achievements” on the job during the past year. Consider the reasons why you think so.'
  }, {
    section: 'self',
    name: 'challenges',
    label: 'Challenges',
    instructions: 'Please note any challenges or obstacles you’ve faced on the job during the past year. Consider the reasons why you think so.'
  }, {
    section: 'self',
    name: 'job_goals',
    label: 'Proposed Job Related Goals',
    instructions: 'Please list what you’d like to accomplish within your role at CCE Tompkins. What will you need (resources, tools, training, assistance) to make this happen?'
  }, {
    section: 'self',
    name: 'development_goals',
    label: 'Professional Development Goals',
    instructions: 'Please propose new professional development goals. What skills, education, experiences or assistance do you think you will need to accomplish these goals in the most successful way possible? Please include any professional growth ideas and issues that you believe are relevant to your job satisfaction and success. Consider sharing how your supervisor could provide assistance in your professional development.'
  }, {
    section: 'self',
    name: 'additional_comments',
    label: 'Additional Comments',
    instructions: 'If desired, use additional space if needed.'
  }
]

export const supervisor = [
  {
    section: 'position',
    name: 'supervisor_position_description',
    label: 'Position Description',
    instructions: 'Is the Positions Description up to date? If not, note any changes to your duties over the review period and any items within the existing position description that may need revision.',
    type: 'question'
  }, {
    section: 'general',
    name: 'documentation',
    label: 'Documentation',
    instructions: 'Consistently & accurately completes all required documentation including program and participant documentation (if required), time & attendance records, business & financial forms, and all other Association required documentation.',
    type: 'rating',
    required: true
  }, {
    section: 'general',
    name: 'attendance',
    label: 'Attendance',
    instructions: 'Consistently demonstrates excellent attendance, dependability, and dedication to accomplishing Association objectives. Scheduled absences and approved leaves do not apply to this section.',
    type: 'rating',
    required: true
  }, {
    section: 'success',
    name: 'health_safety',
    label: 'Health and Safety',
    instructions: 'Supports the association to maintain a safe working environment.  Acts proactively to prevent accidents/injuries and communicates hazards to supervisor when identified.  Attends all pertinent training as assigned.',
    type: 'rating',
    required: true
  }, {
    section: 'success',
    name: 'inclusiveness',
    label: 'Inclusiveness',
    instructions: 'Shows respect for differences in backgrounds, lifestyles, viewpoints, and needs in reference to areas such as ethnicity, race, gender, creed, and sexual orientation. Promotes cooperation and a welcoming environment for all. Works to understand the perspectives brought by all individuals. Pursues knowledge of diversity and inclusiveness.',
    type: 'rating',
    required: true
  }, {
    section: 'success',
    name: 'adaptability',
    label: 'Adaptability',
    instructions: 'Is flexible, open and receptive to new ideas and approaches. Adapts to changing priorities, situations and demands. Handles multiple tasks and priorities. Modifies one\'s preferred way of doing things.',
    type: 'rating',
    required: true
  }, {
    section: 'success',
    name: 'self_development',
    label: 'Self-Development',
    instructions: 'Enhances personal knowledge, skills, and abilities. Anticipates and adapts to technological advances as needed. Seeks opportunities for continuous learning. Seeks and acts upon performance feedback.',
    type: 'rating',
    required: true
  }, {
    section: 'success',
    name: 'communication',
    label: 'Communication',
    instructions: 'Demonstrates the ability to express thoughts clearly, both orally and in writing. Demonstrates effective listening skills. Shares knowledge and information. Asks questions and offers input for positive results.',
    type: 'rating',
    required: true
  }, {
    section: 'success',
    name: 'teamwork',
    label: 'Teamwork',
    instructions: 'Builds working relationships to solve problems and achieve common goals. Demonstrates sensitivity to the needs of others. Offers assistance, support, and feedback to others. Works effectively and cooperatively with others.',
    type: 'rating',
    required: true
  }, {
    section: 'success',
    name: 'service_minded',
    label: 'Service-Minded',
    instructions: 'Is approachable/accessible to others. Reaches out to be helpful in a timely and responsive manner. Strives to satisfy one’s external and/or internal customers. Is diplomatic, courteous, and welcoming.',
    type: 'rating',
    required: true
  }, {
    section: 'success',
    name: 'stewardship',
    label: 'Stewardship',
    instructions: 'Demonstrates accountability in all work responsibilities. Exercises sound and ethical judgment when acting on behalf of the Association and/or University. Exercises appropriate confidentiality in all aspects of work. Shows commitment to work and to consequences of own actions.',
    type: 'rating',
    required: true
  }, {
    section: 'success',
    name: 'motivation',
    label: 'Motivation',
    instructions: 'Shows initiative, anticipates needs and takes actions. Demonstrates innovation, creativity and informed risk-taking. Engages in problem-solving; suggests ways to improve performance and be more efficient. Strives to achieve individual, unit, Association and/or University goals.',
    type: 'rating',
    required: true
  }, {
    section: 'supervisory',
    name: 'employee_communication',
    label: 'Communication with Employees',
    instructions: 'Establishes trust with employees. Provides regular and effective feedback.  Ensures employees understand their roles and the priorities of the job. Supports and coaches employees so they can be  successful.',
    type: 'rating',
    required: false
  }, {
    section: 'supervisory',
    name: 'delegation',
    label: 'Delegation',
    instructions: 'Chooses appropriate projects to delegate. Defines the project e.g. goals, quality standards, constraints, timeline, reporting, etc',
    type: 'rating',
    required: false
  }, {
    section: 'supervisory',
    name: 'recruitment_retention',
    label: 'Recruitment / Retention',
    instructions: 'Effectively selects team members who build the team’s effectiveness and diversity.  Retains quality staff',
    type: 'rating',
    required: false
  }
]
