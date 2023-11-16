// import { Form, Input, message } from 'antd';
// import { useTranslation } from 'react-i18next';
// import { BsCheckLg } from 'react-icons/bs';
// import CustomButton from '../../controllers/common/custombutton/CustomButton';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../config/store';

// function ChangePassword() {
//   const { t } = useTranslation('translation');
//   const [form] = Form.useForm();
//   const dispatch = useDispatch<AppDispatch>();
//   const currentUser = useSelector((state: RootState) => state.auth.currentUser);;

//   const onFinishChangePassword = async (values: any) => {
   
//   };


//   return (
//     <div className="wrapper_pass">
//       <Form form={form} layout="vertical" onFinish={onFinishChangePassword}>
//         <Form.Item label={t('old_pass')} name='oldpassword'>
//           <Input.Password size='large'/>
//         </Form.Item>
//         <Form.Item 
//           label={t('new_pass')}
//           name='newPassword'
//           rules={[
//             {
//               pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//               message: t('rule_password')
//             },
//             {
//               required : true, message: t('your_new_password')
//             }
//           ]}
//         >
//           <Input.Password size='large'/>
//         </Form.Item>
//         <Form.Item
//           label={t('confirm_pass')}
//           name='confirmPassword'
//           dependencies={['newPassword']}
//           rules={[
//             {
//               required:true, message:t('confirm_new_password')
//             },
//             ({getFieldValue}) => ({
//               validator(_,value){
//                 if(!value || getFieldValue('newPassword') === value){
//                   return Promise.resolve()
//                 }
//                 return Promise.reject(new Error(t('two_passwords_not_match')))
//               }
//             })
//           ]}
//         >
//           <Input.Password size='large'/>
//         </Form.Item>
//         <Form.Item>
//           <CustomButton
//             style={{ textAlign: 'center' }}
//             type='primary'
//             item={<span className='button-save'>{t('save')}</span>}
//             size='large'
//             icon={<BsCheckLg fontSize={16} />}
//             htmlType='submit'
//           />
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default ChangePassword;
