import * as Yup from 'yup';

export const usernameSchema = Yup.string()
	.required('Bạn cần nhập tên tài khoản!')
	.min(6, 'Phải nhập từ 6 ký tự trở lên!')
	.max(20, 'Chỉ cho phép nhập tối đa 20 ký tự!');

export const passwordSchema = Yup.string()
	.required('Bạn cần nhập mật khẩu!')
	.min(8, 'Phải nhập từ 8 ký tự trở lên!')
	.max(30, 'Chỉ cho phép nhập tối đa 30 ký tự!');

export const confirmPasswordSchema = Yup.string().oneOf(
	[Yup.ref('password'), null],
	'Mật khẩu nhập lại không khớp với trước đó!'
);

export const emailSchema = Yup.string()
	.required('Bạn cần nhập email!')
	.email('Không đúng định dạng của một email!');

export const firstNameSchema = Yup.string();

export const lastNameSchema = Yup.string()
	.required('Bạn cần nhập tên của mình!')
	.min(2, 'Vui lòng nhập từ 2 ký tự trở lên!');

export const genderSchema = Yup.string().required(
	'Bạn cần nhập mục giới tính!'
);

export const dayOfBirthSchema = Yup.object({
	display: Yup.string().required('Bạn cần nhập ngày sinh của mình!'),
	data: Yup.object({
		day: Yup.string().required('Bạn cần nhập ngày sinh của mình!'),
		month: Yup.string().required('Bạn cần nhập tháng sinh của mình!'),
		year: Yup.string().required('Bạn cần nhập năm sinh của mình!'),
	}),
});
