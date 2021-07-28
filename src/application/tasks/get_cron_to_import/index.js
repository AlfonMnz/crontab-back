const GetCronToImportResponse = require("./get-cron-to-import-response");

class GetCronToImport {
    constructor({cronFile}) {
        this.cronFile = cronFile;
    }

    async get() {
        return new GetCronToImportResponse(await this.cronFile.getCronToImport());
    }
}

module.exports = GetCronToImport;