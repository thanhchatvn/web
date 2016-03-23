from openerp import osv, fields, api, _, models
import logging

class project_task_type(models.Model):

    _inherit = 'project.task.type'
    __logger = logging.getLogger(_inherit)

    def update_stage_for_project(self, cr, uid, vals, context={}):
        self.__logger.info('begin  update_stage_for_project')
        self.__logger.info(vals)
        if vals.has_key('context') and vals.get('context') and vals['context'].has_key('default_project_id') and vals['context']['default_project_id'] and vals.has_key('id') and vals.get('id'):
            sql = "INSERT INTO project_task_type_rel (type_id,project_id) VALUES (%s,%s)" % (vals.get('id'),  vals['context']['default_project_id'])
            cr.execute(sql)
        self.__logger.info('end  update_stage_for_project')
        return True