const PHASES = [0,1,2,3,4,5]
const ROBOT_HANDLES = ['echo-bot','lg-bot']

const isValidPhase = phase =>
  PHASES.includes(phase)

const isUser = user =>
  !isUserARobot(user)

const isUserARobot = user =>
  ROBOT_HANDLES.includes(user.handle)

const isUserActive = user =>
  !!user.active

const isUserInactive = user =>
  !user.active

const isUserStaff = user =>
  !isUserARobot(user) &&
  user.roles.includes('staff')

const isUserALearner = user =>
  !isUserARobot(user) &&
  !isUserStaff(user) &&
  user.roles.includes('learner')

module.exports = {
  PHASES,
  ROBOT_HANDLES,
  isValidPhase,
  isUser,
  isUserARobot,
  isUserActive,
  isUserStaff,
  isUserALearner,
}
