const { Router } = require('express')
const docController = require('../controllers/docController.js')
const requireAuth = require('../middleware/requireAuth.js')
const router = Router() 


// router.get('/',docController.docs_get)
router.post('/',docController.docs_post)
router.patch('/:id',requireAuth,docController.authors_patch)
// router.patch('/body/:id',docController.content_patch)
router.patch('/authors/:id',requireAuth,docController.authors_remove)
router.delete('/:id',requireAuth,docController.docs_delete)
// router.putt('/',docController.docs_put)
router.get('/:id',docController.docsid_get)
router.get('/author/:id',docController.userdocs_get)
// router.delete('/:id',docController.docs_delete)


module.exports = router ;