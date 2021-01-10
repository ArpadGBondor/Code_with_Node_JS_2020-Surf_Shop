#Image upload

 - Create cloudinary account
 - Activate account from e-mail (very important!)
 - Install cloudinary and multer
   `npm i -S cloudinary multer`
 - Configure multer for upload in routes file (add image filter?)
   - add middleware -> upload.array('nameAttr',maxNum)
 - Update new view from element with enctype='multipart/form-data'
 - Add input to form -> attrs: type='file', name='images', accept='images/*', multiple
 - Require cloudinary in controller
 - Configure cloudinary (put api_secret in .env)
 - Add for...of loop with cloudinary upload
 - Update Post mode, images field to [{url: String, public_id: String}]
 - Test it out!
