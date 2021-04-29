import { crudMixin } from "@/models/mixins";

const useCrudMixin = prototype => {
  return {
    loadCollection: prototype.loadCollection || crudMixin.loadCollection,
    search: prototype.search || crudMixin.search,
    loadRecord: prototype.loadRecord || crudMixin.loadRecord,
    insertRecord: prototype.insertRecord || crudMixin.insertRecord,
    updateRecord: prototype.updateRecord || crudMixin.updateRecord,
    updateRecordPatch:
      prototype.updateRecordPatch || crudMixin.updateRecordPatch,
    deleteRecord: prototype.deleteRecord || crudMixin.deleteRecord,
    clearFilters: prototype.clearFilters || crudMixin.clearFilters,
    beforeFilter: prototype.beforeFilter || crudMixin.beforeFilter
  };
};

export default useCrudMixin;
