const prefix = '/api'
const system = `${prefix}/system` //系统设置相关的前缀
const userPrefix = `${system}/user` // 用户相关前缀
const rolePrefix = `${system}/role` // 角色相关前缀
const menuPrefix = `${system}/menu` // 角色相关前缀
const dictPrefix = `${system}/dict` // 角色相关前缀
export enum Api {
  userNameLogin = `${prefix}/login/userName`, //用户名登录
  // 用户相关
  getUserList = `${userPrefix}/list`, //获取用户列表
  addUser = `${userPrefix}/add`, // 新增用户
  deleteUser = `${userPrefix}/del/`, // 删除当前用户 /后边 拼接ID
  updateUser = `${userPrefix}/update`, // 更新用户信息
  // 角色相关
  getRoleList = `${rolePrefix}/list`, // 获取角色列表
  addRole = `${rolePrefix}/add`, // 获取角色列表
  deleteRole = `${rolePrefix}/delete/`, // 删除角色 拼接ID
  ApiUpdateRole = `${rolePrefix}/update`, // 更新角色
  // 菜单相关
  APiMenuList = `${menuPrefix}/list`, // 获取菜单列表
  ApiAddMenu = `${menuPrefix}/add`, // 新增菜单
  ApiUpdateMenu = `${menuPrefix}/update`, // 修改菜单
  ApiDelMenu = `${menuPrefix}/delete/`, // 删除菜单 拼接ID
  // ------------------------------------------------------------------------------------------------------------------------------------------
  useRegister = '/not/sys/register', //用户名注册
  permissions = '/users/back/permissions',
  movePermissions = '/users/move/permissions',
  smsCode = '/sys/sms',
  userPhoneLogin = '/sys/login/phone',
  useRetrievePass = '/sys/retrievePass',
  permissions401 = '/err/401',
  // 权限相关
  getBackMenu = `${prefix}/user/permissions`,
  // 字典相关
  ApiGetDIctTypeList = `${dictPrefix}/type/list`,
  ApiDelDictType = `${dictPrefix}/type/del/` // 删除字典类别 拼接ID
}
export enum APiSystem {
  // 字典相关
  DictAddType = `${dictPrefix}/type/add`, // 新增字典类别
  DictEditType = `${dictPrefix}/type/update`, // 修改字典类别
  // 字典子类相关接口
  DictInfoUpdate = `${dictPrefix}/info/update`,
  DictInfoAdd = `${dictPrefix}/info/add/`, // 新增字典子类 拼接ID
  DictInfoDel = `${dictPrefix}/info/del/`, // 删除字典子类 拼接ID
  // 用户相关
  UserUpdateState = `${userPrefix}/update/state`
}
export enum BaseApi {
  picCode = `${prefix}/base/picCode` //获取图片验证码
}
