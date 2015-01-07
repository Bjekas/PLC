/**
 * Created by Daniel Elias on 05-09-2014.
 */

/**
 Configuration variables
*/
var fileName = "Data3.html"; //File with plc values of Programming errors
var refreshTime = 1000; //Time (in milliseconds) between data refresh

/**
 * Variables
 */
var $div = $('<div>');
var Error_code;
var SW_FLT = '', BLK_TYPE = '', BLK_NUM = '', RESERVED_1 = '', RESERVED_2 = '', FLT_REG, PRG_ADDR, DATE_TIME;
var TE_Fault_ID = '', PE_DATE_TIME = '', PE_ErrorMsg = '';
var HE_IO_FLAG = '', HE_MDL_ADDR = '', HE_PNT_ADDR = '', HE_DATE_TIME = '', HE_ErrorMsg = '';
var DE_FAULT_EN = '0', DE_MDL_ADDR = '', DE_FAULT_1, DE_FAULT_2, DE_FAULT_3, DE_DATE_TIME;
var UE_EV_CLASS = '', UE_FLT_ID = '', UE_MDL_TD, UE_MDL_ADDR, UE_RACK_NUM, UE_MDL_TYPE, UE_DATE_TIME;
var IOE_SW_FLT = '', IOE_BLK_TYPE, IOE_BLK_NUM, IOE_ACC_TYPE, IOE_MEM_AREA, IOE_MEM_ADDR,IOE_PRG_ADDR, IOE_DATE_TIME;

function sleep(millis){
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function wrtLbl(txt) {
    var l1 = document.createElement("Label");
    l1.innerHTML = txt;
    document.getElementById('parentdiv').appendChild(l1);
}

function refreshData() {
    $.get(fileName, {}, function(data) {
        var $response = $('<div />').html(data);
        SW_FLT = $response.find('#SW_FLT').text();
        BLK_TYPE = $response.find('#BLK_TYPE').text();
        BLK_NUM = $response.find('#BLK_NUM').text();
        RESERVED_1 = $response.find('#RESERVED_1').text();
        RESERVED_2 = $response.find('#RESERVED_2').text();
        FLT_REG = $response.find('#FLT_REG').text();
        PRG_ADDR = $response.find('#PRG_ADDR').text();
        DATE_TIME = $response.find('#DATE_TIME').text();

        TE_Fault_ID = $response.find('#PE_FLT_ID').text();
        PE_DATE_TIME = $response.find('#PE_DATE_TIME').text();

        HE_IO_FLAG = $response.find('#HE_IO_FLAG').text();
        HE_MDL_ADDR = $response.find('#HE_MDL_ADDR').text();
        HE_PNT_ADDR = $response.find('#HE_PNT_ADDR').text();
        HE_DATE_TIME = $response.find('#HE_DATE_TIME').text();

        DE_FAULT_EN = $response.find('#DE_FAULT_EN').text();
        DE_MDL_ADDR = $response.find('#DE_MDL_ADDR').text();
        DE_FAULT_1 = parseInt($response.find('#DE_FAULT_1').text());
        DE_FAULT_2 = parseInt($response.find('#DE_FAULT_2').text());
        DE_FAULT_3 = parseInt($response.find('#DE_FAULT_3').text());
        DE_DATE_TIME = $response.find('#DE_DATE_TIME').text();

        UE_EV_CLASS = parseInt($response.find('#UE_EV_CLASS').text());
        UE_FLT_ID = parseInt($response.find('#UE_FLT_ID').text());
        UE_MDL_TD = parseInt($response.find('#UE_MDL_TD').text());
        UE_MDL_TYPE = parseInt($response.find('#UE_MDL_TYPE').text());
        UE_MDL_ADDR = parseInt($response.find('#UE_MDL_ADDR').text());
        UE_RACK_NUM = parseInt($response.find('#UE_RACK_NUM').text());
        UE_DATE_TIME = $response.find('#UE_DATE_TIME').text();

        IOE_SW_FLT = parseInt($response.find('#IOE_SW_FLT').text());
        IOE_BLK_TYPE = parseInt($response.find('#IOE_BLK_TYPE').text());
        IOE_BLK_NUM = parseInt($response.find('#IOE_BLK_NUM').text());
        IOE_ACC_TYPE = parseInt($response.find('#IOE_ACC_TYPE').text());
        IOE_MEM_AREA = parseInt($response.find('#IOE_MEM_AREA').text());
        IOE_MEM_ADDR = parseInt($response.find('#IOE_MEM_ADDR').text());
        IOE_PRG_ADDR = parseInt($response.find('#IOE_PRG_ADDR').text());
        IOE_DATE_TIME = $response.find('#IOE_DATE_TIME').text();

    },'html');
}

//Programming error's
function progErr() {
    //Error found?
    if (SW_FLT != '0') {
        switch (BLK_TYPE) {
            case '136': BLK_TYPE = 'OB'; break;
            case '138': BLK_TYPE = 'DB'; break;
            case '140': BLK_TYPE = 'FC'; break;
            case '142': BLK_TYPE = 'FB'; break;
            default: BLK_TYPE = '--'; break;
        }

        if (SW_FLT == '34' || SW_FLT == '35' || SW_FLT == '40' || SW_FLT == '41'){
            switch (RESERVED_1) {
                case '0': RESERVED_1 = 'I/O area'; break;
                case 1: RESERVED_1 = 'Process image input'; break;
                case '2': RESERVED_1 = 'Process image output'; break;
                case '3': RESERVED_1 = 'Bit memory'; break;
                case '4': RESERVED_1 = 'Global DB'; break;
                case '5': RESERVED_1 = 'Instance DB'; break;
                case '6': RESERVED_1 = 'Own local data'; break;
                case '7': RESERVED_1 = 'Local data of the caller'; break;
                default: RESERVED_1 = 'Unknown';
            }

            switch (RESERVED_2) {
                case '0': RESERVED_2 = 'Bit access'; break;
                case '1': RESERVED_2 = 'Byte access'; break;
                case '2': RESERVED_2 = 'Word access'; break;
                case '3': RESERVED_2 = 'DWord access'; break;
                default: RESERVED_2 = 'Unknown';
            }
        }
    }
    //No error, clear messages
    else {
        BLK_TYPE = '';
        BLK_NUM = '';
        DATE_TIME = '';
    }

    //Build error message
    switch (SW_FLT) {
        case '0': Error_code = 'No error found'; DATE_TIME = ''; break;
        case '33': Error_code = 'BCD conversion error'; break;
        case '34': Error_code = RESERVED_1 + ' - ' + RESERVED_2 + ' : ' + 'Area length error when reading'; break;
        case '35': Error_code = RESERVED_1 + ' - ' + RESERVED_2 + ' : ' + 'Area length error when writing'; break;
        case '36': Error_code = 'Area error when reading unauthorized area: ' + FLT_REG; break;
        case '37': Error_code = 'Area error when writing unauthorized area: ' + FLT_REG; break;
        case '38': Error_code = 'Error in timer number: T' + FLT_REG; break;
        case '39': Error_code = 'Error in counter number: C' + FLT_REG; break;
        case '40': Error_code = RESERVED_1 + ' - ' + RESERVED_2 + ' : ' + 'Read access to a byte, word or double word with a pointer, the bit address of which is not 0'; break;
        case '41': Error_code = RESERVED_1 + ' - ' + RESERVED_2 + ' : ' + 'Write access to a byte, word or double word with a pointer, the bit address of which is not 0'; break;
        case '48': Error_code = 'Write access to the write-protected global DB' + FLT_REG; break;
        case '49': Error_code = 'Write access to the write-protected instance DB' + FLT_REG; break;
        case '50': Error_code = 'DB number error when accessing global DB' + FLT_REG; break;
        case '51': Error_code = 'DB number error when accessing instance DB' + FLT_REG; break;
        case '52': Error_code = 'Number error during FC' + FLT_REG + ' call'; break;
        case '53': Error_code = 'Number error during FB' + FLT_REG + ' call'; break;
        case '58': Error_code = 'Access to DB' + FLT_REG + ' that is not loaded. The DB number is located in the permitted area'; break;
        case '60': Error_code = 'Access to FC' + FLT_REG + ' that is not loaded. The FC number lies in the permissible area'; break;
        case '61': Error_code = 'Access to FB' + FLT_REG + ' that is not loaded. The FC number lies in the permissible area'; break;
        case '62': Error_code = 'Access to SFB' + FLT_REG + ' that is not loaded. The FC number lies in the permissible area'; break;
        default: Error_code = 'Unknown';
    }

    //Is there an error? If yes write details on div
    if (SW_FLT != '0') {
        wrtLbl('<p>Source: ' + BLK_TYPE + BLK_NUM + '</p>');
        wrtLbl('<p>Details: ' + Error_code + '</p>');
        wrtLbl('<p>Prg address: ' + PRG_ADDR + '</p>');
        wrtLbl('<p>Time stamp: ' + DATE_TIME + '</p><hr>');

    }
}

//Cycle time error's
function timeErr() {
    switch (TE_Fault_ID) {
        case '0': PE_ErrorMsg = 'No error found'; PE_DATE_TIME = ''; break;
        case '1': PE_ErrorMsg = 'Maximum cycle time exceeded'; break;
        case '2': PE_ErrorMsg = 'Called OB is still being executed'; break;
        case '5': PE_ErrorMsg = 'Expired time-of-day interrupt due to time jump'; break;
        case '6': PE_ErrorMsg = 'Expired time-of-day interrupt on return to RUN mode'; break;
        case '7': PE_ErrorMsg = 'Queue overflow'; break;
        case '9': PE_ErrorMsg = 'Interrupt loss due to high interrupt load'; break;
        default: PE_ErrorMsg = 'Unknown';
    }

    //Is there an error? If yes write details on div
    if (TE_Fault_ID != '0') {
        wrtLbl('<p>Details: ' + PE_ErrorMsg + '</p>');
        wrtLbl('<p>Time stamp: ' + PE_DATE_TIME + '</p><hr>');
    }
}

//Hardware error's
function hwError() {
    switch (HE_IO_FLAG) {
        case '0': HE_ErrorMsg = 'No error found'; HE_MDL_ADDR = '', HE_PNT_ADDR = '', HE_DATE_TIME = ''; break;
        case '84': HE_ErrorMsg = 'Error in input module'; break;
        case '85': HE_ErrorMsg = 'Error in output module'; break;
        default: HE_ErrorMsg = 'Error in unknown module';
    }
    if (HE_IO_FLAG != '0') {
        wrtLbl('<p>Details: ' + HE_ErrorMsg + '</p>');
        wrtLbl('<p>Module address: ' + HE_MDL_ADDR + '</p>');
        wrtLbl('<p>Point address: ' + HE_PNT_ADDR + '</p>');
        wrtLbl('<p>Time stamp: ' + HE_DATE_TIME + '</p><hr>');
    }
}

//Diagnostic error
function diagError() {
    //alert(DE_FAULT_EN);
    if (DE_FAULT_EN == '1') {
        if (DE_MDL_ADDR != '0') {
            wrtLbl('<p>Module adress: ' + DE_MDL_ADDR + '</p>');
        }
        wrtLbl('Details: <br>');
        if ((DE_FAULT_1&1) == 1) {
            wrtLbl('Module is defective<br>');
        }
        if ((DE_FAULT_1&2) == 2 ) {
            wrtLbl('Internal fault<br>');
        }
        if ((DE_FAULT_1&4) == 4) {
            wrtLbl('External fault<br>');
        }
        if ((DE_FAULT_1&8) == 8) {
            wrtLbl('Channel fault<br>');
        }
        if ((DE_FAULT_1&16) == 16) {
            wrtLbl('External auxiliary voltage missing<br>');
        }
        if ((DE_FAULT_1&32) == 32) {
            wrtLbl('Front panel connector not plugged in<br>');
        }
        if ((DE_FAULT_1&64) == 64) {
            wrtLbl('Module parameters not assigned<br>');
        }
        if ((DE_FAULT_1&128) == 128) {
            wrtLbl('Incorrect parameters on module<br>');
        }
        if ((DE_FAULT_2&1) == 1) {
            wrtLbl('Application module is missing or has an error<br>');
        }
        if ((DE_FAULT_2&2) == 2) {
            wrtLbl('Communication problem<br>');
        }
        if ((DE_FAULT_2&4) == 4) {
            wrtLbl('Module operation mode: STOP<br>');
        }
        if ((DE_FAULT_2&8) == 8) {
            wrtLbl('Watchdog timer responded<br>');
        }
        if ((DE_FAULT_2&16) == 16) {
            wrtLbl('Internal power supply failed<br>');
        }
        if ((DE_FAULT_2&32) == 32) {
            wrtLbl('Battery exhausted<br>');
        }

        if ((DE_FAULT_2&64) == 64) {
            wrtLbl('Entire backup failed<br>');
        }
        if ((DE_FAULT_3&1) == 1) {
            wrtLbl('Expansion rack failure<br>');
        }
        if ((DE_FAULT_3&2) == 2) {
            wrtLbl('Processor failure<br>');
        }
        if ((DE_FAULT_3&4) == 4) {
            wrtLbl('EPROM fault<br>');
        }
        if ((DE_FAULT_3&8) == 8) {
            wrtLbl('RAM fault<br>');
        }
        if ((DE_FAULT_3&16) == 16) {
            wrtLbl('ADC/DAC error<br>');
        }
        if ((DE_FAULT_3&32) == 32) {
            wrtLbl('Fuse tripped<br>');
        }
        if ((DE_FAULT_3&64) == 64) {
            wrtLbl('Hardware interrupt lost<br>');
        }
        wrtLbl('Time stamp: '+ DE_DATE_TIME + '<br>');
        wrtLbl('<hr>');
    }
}

//Plug and unplug Error's
function plugError() {
    var validMDLType = false;

    if (UE_FLT_ID != 0) {
        switch(UE_FLT_ID) {
            case 50: wrtLbl('<p>Event class: End of module parameter reassignment</p>'); break;
            case 51: wrtLbl('<p>Event class: Start of module parameter reassignment</p>'); break;
            case 56: wrtLbl('<p>Event class: Module inserted</p>'); break;
            case 57: wrtLbl('<p>Event class: Module removed or not responding, or end of parameter reassignment</p>'); break;
            default: wrtLbl('<p>Event class: Unknown</p>');
        }

        if ((UE_MDL_TYPE&0x0500) == 0x0500) {
            wrtLbl('<p>Module type: Analog module</p>');
            validMDLType = true;
        }
        if ((UE_MDL_TYPE&0x0800) == 0x0800) {
            wrtLbl('<p>Module type: Function module</p>');
            validMDLType = true;
        }
        if ((UE_MDL_TYPE&0x0C00) == 0x0C00) {
            wrtLbl('<p>Module type: CP</p>');
            validMDLType = true;
        }
        if ((UE_MDL_TYPE&0x0F00) == 0x0F00) {
            wrtLbl('<p>Module type: Digital module</p>');
            validMDLType = true;
        }
        if (UE_MDL_TYPE == 0x8340) {
            wrtLbl('<p>Module type: Substitution type ID for input module</p>');
            validMDLType = true;
        }
        if (UE_MDL_TYPE == 0x9340) {
            wrtLbl('<p>Module type: Substitution type ID for output module</p>');
            validMDLType = true;
        }
        if (UE_MDL_TYPE == 0xA340) {
            wrtLbl('<p>Module type: Substitution type ID for combination module</p>');
            validMDLType = true;
        }
        if (UE_MDL_TYPE == 0xF340) {
            wrtLbl('<p>Module type: Substitution type ID for empty module or module that cannot be uniquely identified</p>');
            validMDLType = true;
        }
        if (UE_MDL_TYPE == 0x8101) {
            wrtLbl('<p>Module type: PN IO - Module type of the inserted module is the same as the module type of the removed module</p>');
            validMDLType = true;
        }
        if (UE_MDL_TYPE == 0x8102) {
            wrtLbl('<p>Module type: PN IO - Module type of the inserted module is not the same as the module type of the removed module</p>');
            validMDLType = true;
        }
        if (!validMDLType) {
            wrtLbl('<p>Module type: Unknown</p>');
        }

        switch(UE_MDL_TD) {
            case 0x54: wrtLbl('<p>Module TD: Peripheral range of inputs (PI)</p>'); break;
            case 0x55: wrtLbl('<p>Module TD: Peripheral range of outputs (PQ)</p>'); break;
            default: wrtLbl('<p>Module TD: Unknown</p>');
        }

        wrtLbl('<p>Module address: ' + UE_MDL_ADDR + '</p>');
        wrtLbl('<p>Rack number: ' + UE_RACK_NUM + '</p>');

        if ((UE_EV_CLASS == 0x39)&(UE_FLT_ID == 0x51)) {
            wrtLbl('<p>Event class: Module removed or not responding, or end of parameter reassignment</p>');
            wrtLbl('<p>Details: PROFINET IO module removed</p>');
        }
        else if((UE_EV_CLASS == 0x39)&(UE_FLT_ID == 0x54)) {
            wrtLbl('<p>Event class: Module removed or not responding, or end of parameter reassignment</p>');
            wrtLbl('<p>Details: PROFINET IO submodule removed</p>');
        }
        else if((UE_EV_CLASS == 0x38)&(UE_FLT_ID == 0x54)) {
            wrtLbl('<p>Event class: Module inserted</p>');
            wrtLbl('<p>Details: PROFINET IO submodule inserted and matches configured submodule</p>');
        }
        else if((UE_EV_CLASS == 0x38)&(UE_FLT_ID == 0x55)) {
            wrtLbl('<p>Event class: Module inserted</p>');
            wrtLbl('<p>Details: PROFINET IO submodule inserted, but does not match configured submodule</p>');
        }
        else if((UE_EV_CLASS == 0x38)&(UE_FLT_ID == 0x56)) {
            wrtLbl('<p>Event class: Module inserted</p>');
            wrtLbl('<p>Details: PROFINET IO submodule inserted; but error in module parameter assignment</p>');
        }
        else if((UE_EV_CLASS == 0x38)&(UE_FLT_ID == 0x57)) {
            wrtLbl('<p>Event class: Module inserted</p>');
            wrtLbl('<p>Details: PROFINET IO submodule or module inserted, but with a problem or maintenance</p>');
        }
        else if((UE_EV_CLASS == 0x38)&(UE_FLT_ID == 0x58)) {
            wrtLbl('<p>Event class: Module inserted</p>');
            wrtLbl('<p>Details: PROFINET IO submodule, access error corrected</p>');
        }
        else if((UE_EV_CLASS == 0x39)&(UE_FLT_ID == 0x61)) {
            wrtLbl('<p>Event class: Module removed or not responding, or end of parameter reassignment</p>');
            wrtLbl('<p>Details: Module removed or not responding</p>');
        }
        else if((UE_EV_CLASS == 0x38)&(UE_FLT_ID == 0x61)) {
            wrtLbl('<p>Event class: Module inserted</p>');
            wrtLbl('<p>Details: Module inserted, module type OK</p>');
        }
        else if((UE_EV_CLASS == 0x38)&(UE_FLT_ID == 0x63)) {
            wrtLbl('<p>Event class: Module inserted</p>');
            wrtLbl('<p>Details: Module inserted but module type is incorrect</p>');
        }
        else if((UE_EV_CLASS == 0x38)&(UE_FLT_ID == 0x64)) {
            wrtLbl('<p>Event class: Module inserted</p>');
            wrtLbl('<p>Details: Module inserted but faulty (module ID cannot be read))</p>');
        }
        else if((UE_EV_CLASS == 0x38)&(UE_FLT_ID == 0x65)) {
            wrtLbl('<p>Event class: Module inserted</p>');
            wrtLbl('<p>Details: Module inserted but there is an error in module parameter assignment</p>');
        }
        else if((UE_EV_CLASS == 0x39)&(UE_FLT_ID == 0x66)) {
            wrtLbl('<p>Event class: Module removed or not responding, or end of parameter reassignment</p>');
            wrtLbl('<p>Details: Module not responding, load voltage error</p>');
        }
        else if((UE_EV_CLASS == 0x38)&(UE_FLT_ID == 0x66)) {
            wrtLbl('<p>Event class: Module inserted</p>');
            wrtLbl('<p>Details: Module responds again, load voltage error corrected</p>');
        }
        else if((UE_EV_CLASS == 0x33)&(UE_FLT_ID == 0x67)) {
            wrtLbl('<p>Event class: Start of module parameter reassignment</p>');
            wrtLbl('<p>Details: Start module parameter reassignment</p>');
        }
        else if((UE_EV_CLASS == 0x32)&(UE_FLT_ID == 0x67)) {
            wrtLbl('<p>Event class: End of module parameter reassignment</p>');
            wrtLbl('<p>Details: End of module parameter reassignment</p>');
        }
        else if((UE_EV_CLASS == 0x39)&(UE_FLT_ID == 0x68)) {
            wrtLbl('<p>Event class: Module removed or not responding, or end of parameter reassignment</p>');
            wrtLbl('<p>Details: Module parameter reassignment terminated with error</p>');
        }
        else {
            wrtLbl('<p>Event class: Unknown</p>');
            wrtLbl('<p>Details: Unknown</p>');
        }

        wrtLbl('<p>Time stamp: ' + UE_DATE_TIME + '</p><hr>');
    }
}

//IO error's
function IOErr() {
    //Error found?
    if (IOE_SW_FLT != 0) {
        switch (IOE_BLK_TYPE) {
            case 0x88: wrtLbl('<p>Source: OB' + IOE_BLK_NUM + '</p>');break;
            case 0x8C: wrtLbl('<p>Source: FC' + IOE_BLK_NUM + '</p>');break;
            case 0x8E: wrtLbl('<p>Source: FB' + IOE_BLK_NUM + '</p>');break;
            default: wrtLbl('<p>Source: ??' + IOE_BLK_NUM + '</p>');
        }

        switch (IOE_SW_FLT) {
            case 0x42: wrtLbl('<p>Details: I/O access error, reading'); break;
            case 0x43: wrtLbl('<p>Details: I/O access error, writing'); break;
            default: wrtLbl('<p>Details: Unknown</p>');
        }

        switch(IOE_MEM_AREA) {
            case 0: wrtLbl('<p>Memory area: I/O area</p>'); break;
            case 1: wrtLbl('<p>Memory area: Process image input</p>'); break;
            case 2: wrtLbl('<p>Memory area: Process image output</p>'); break;
            default: wrtLbl('<p>Memory area: Unknown</p>');
        }

        switch(IOE_ACC_TYPE) {
            case 0: wrtLbl('<p>Access type: Bit access</p>'); break;
            case 1: wrtLbl('<p>Access type: Byte access</p>'); break;
            case 2: wrtLbl('<p>Access type: Word access</p>'); break;
            case 3: wrtLbl('<p>Access type: DWord access</p>'); break;
            default: wrtLbl('<p>Access type: Unknown</p>');
        }

        wrtLbl('<p>Program address: ' + IOE_PRG_ADDR + '</p>');
        wrtLbl('<p>Memory address: ' + IOE_MEM_ADDR + '</p>');
        wrtLbl('<p>Time stamp: ' + IOE_DATE_TIME + '</p><hr>');
    }
}

$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    refreshData();

    setInterval(function() {
        $('#parentdiv').empty();
        refreshData();

        //toastr.info("BLABLA", "Info");
        progErr();
        timeErr();
        hwError();
        diagError();
        plugError();
        IOErr();
    }, refreshTime);
})

