
export class GoogleSpreadsheet {
    sheetsByIndex = [
        {
            async getRows(){
                let GoogleSpreadsheetRow = {password:"zxc", username:"nemanja"}
                return [GoogleSpreadsheetRow]
            }
        },
        {
            async getRows(){
                return []
            }
        },
    ];

    async useServiceAccountAuth(){

    }

    async loadInfo() {

    }


}
