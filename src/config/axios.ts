import axios from 'axios'

const instance = axios.create({
  headers: {
	'Content-type': 'application/json',
	'Access-Control-Allow-Origin': '*'
  },
  responseType: 'json'
})

instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token')
  if (accessToken) {
	config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => {
	return response
  },
  async (error) => {
	if (error.response && error.response.status === 401) {
	  const refreshToken = localStorage.getItem('refreshToken')
	  const { config: originalRequest, response } = error
	  if (refreshToken && originalRequest.url !== '/api/user/refresh-token') {
		try {
		  const refreshTokenResponse = await axios.post('/api/user/refresh-token', null, {
			headers: {
			  RefreshToken: refreshToken
			}
		  })

		  if (refreshTokenResponse.status === 200) {
			// Làm mới token thành công
			localStorage.setItem('token', refreshTokenResponse.data.token)
			localStorage.setItem('refreshToken', refreshTokenResponse.data.refreshToken)

			// Cập nhật header Authorization trong yêu cầu gốc
			originalRequest.headers.Authorization = `Bearer ${refreshTokenResponse.data.token}`

			// Thực hiện lại yêu cầu gốc với token mới
			return axios(originalRequest)
		  }
		} catch (refreshError) {
		  // Xử lý lỗi làm mới token
		  console.error('Lỗi làm mới token:', refreshError)
		  // Điều gì sẽ xảy ra sau khi thất bại, ví dụ: đăng xuất người dùng hoặc xử lý lỗi khác
		}
	  }
	}
	return Promise.reject(error)
  }
)

export default instance
