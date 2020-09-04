const $ = require("jquery");
const electron = require("electron");
const fs = require("fs");
const dialog = electron.remote.dialog;
$(document).ready(
    function () {
        db = [];
        $("#grid .cell").on("click", function () {
            let rid = Number($(this).attr("ri"));
            let cid = Number($(this).attr("ci"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container1").val(ciAdrr +(rid+1));
        })
        $(".menu-items").on("click",function(){
            $(".menu-options-item").removeClass("selected");
            let id= $(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })
        $("#New").on("click", function(){
            db =[];
            $("#grid").find(".row").each(function(){
                let row=[];
                $(this).find(".cell").each(function(){
                    // updating db
                    let cell = " ";
                    row.push(cell);
                    // displaying the false
                    $(this).html(" ");
                })
                db.push(row);
            })
        })
        $("#grid .cell").on("keyup", function () {
            
            let rid = Number($(this).attr("ri"));
            let cid = Number($(this).attr("ci"));
            db[rid][cid] = $(this).html();
            console.log(db);
            // console.log(db[rid][cid]);
        })
        $("#Save").on("click",async function(){
            let sdb = await dialog.showOpenDialog();
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(sdb.filePaths[0], jsonData);
        })
        $("#Open").on("click", async function(){
            let odb = await dialog.showOpenDialog();
            let fp = odb.filePaths[0];
            let content = fs.readFileSync(fp);
            db = JSON.parse(content);
            let rows = $("#grid").find(".row");
            for(let i=0;i<rows.length;i++){
                let cRowcells = $(rows[i]).find(".cell");
                for(let j = 0; j < cRowcells.length;j++){
                    $(cRowcells[j]).html(db[i][j]);
                }
            }
        })
        function init(){
            $("#File").trigger("click");
            $("#New").click();
        }
        init();

        console.log(db);
    }
);