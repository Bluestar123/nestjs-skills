// 方法调用前 检查权限

const users = {
  1: {roles: ['admin']},
  2: {roles: ['user']}
}
function authorize(target, propertyKey, descriptor:PropertyDescriptor){
  const originalMethod = descriptor.value;
  descriptor.value = function(...args){
    let user = users[args[0]];
    if (user && user.roles.includes('admin')) {
      originalMethod.apply(this, args);
    } else {
      throw new Error('Unauthorized');
    }
  }
  return descriptor;
}

class AdminPanel{
  @authorize
  deleteUser(role) {
    console.log('delete user');
  }
}

const adminPanel = new AdminPanel();
adminPanel.deleteUser(2);