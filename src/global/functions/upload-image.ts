/**
 * Reference:
 * 1. Imgur API docs https://apidocs.imgur.com/#authorization-and-oauth
 * 2. Register Imgur Client https://api.imgur.com/oauth2/addclient
 * 3. Imgur Postman collection https://web.postman.co/workspace/My-Workspace~a365b76a-a99a-4ce5-8e93-906a33980df4/request/5754213-2488b763-e71e-4738-a49e-b15bf7f189c6
 */
// a760628384a4529a3d0dcec72299af8901c91918 - Client Secret

import { toaster } from "evergreen-ui"
import METHODS from "global/constants/restMethods"

const uploadImage =async (file: any) => {
// const data = new URLSearchParams()
const data = new FormData()
data.append('image', file)

const res = await fetch("https://api.imgur.com/3/image", {
    method: METHODS.POST,
    body: data,
    headers: {
    'Authorization': `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`
    }
})
const result = await res.json()
if (result?.status === 200) toaster.success("Image Uploaded Successfully", {
    id: 'edit-desc-img-upload',
    duration: 10
})
else toaster.danger("Image Upload Unsuccessful", {
    id: 'edit-desc-img-upload',
    duration: 10
})
return result
}

export default uploadImage
