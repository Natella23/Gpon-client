// function getValues() {
//     return {
//         id: document.getElementById("idValue").value.trim(),
//         sn: document.getElementById("snAuth").value.trim(),
//         mac: document.getElementById("mac").value.trim(),
//         slot: document.getElementById("interfaceNumber").value.trim(),
//         port: document.getElementById("ontNumber").value.trim(),
//         ont: document.getElementById("ontNumber2").value.trim(),
//         service: document.getElementById("servicePort").value.trim(),
//         vlan: document.getElementById("vlan").value.trim(),
//         gem: document.getElementById("gemport").value.trim(),
//         multicast: document.getElementById("multicast").value.trim()
//     };
// }


function getValues() {
    return {
        id: document.getElementById("idValue").value.trim() || "-",
        sn: document.getElementById("snAuth").value.trim() || "-",
        mac: document.getElementById("mac").value.trim() || "-",
        slot: document.getElementById("interfaceNumber").value.trim(),
        port: document.getElementById("ontNumber").value.trim() ,
        ont: document.getElementById("ontNumber2").value.trim() ,
        service: document.getElementById("servicePort").value.trim() ,
        vlan: document.getElementById("vlan").value.trim() ,
        gem: document.getElementById("gemport").value.trim() || "5",
        multicast: document.getElementById("multicast").value.trim() || "19"
    };
}
function show(text) {
    document.getElementById("sonuc").textContent = text;
}

/*==========================
    QUICK COMMANDS
==========================*/

function port2() {

    let d = getValues();

    show(`display ont info summary 0/${d.slot}/${d.port} | no-more

display ont info 0/${d.slot} all

-------------------------Birlink__Megalink__Signal-------------------------

config

interface gpon 0/${d.slot}

display ont optical-info ${d.port} ${d.ont}

quit

quit`);
}

function service() {

    let d = getValues();

    show(`display service-port all | no-more ${d.service}`);
}

function gemport() {

    let d = getValues();

    show(`display ont gemport 0/${d.slot} ${d.port} ${d.ont}`);
}

/*==========================
        CITYNET
==========================*/

function citynet() {

    let d = getValues();

    show(`config

interface gpon 0/${d.slot}

ont add ${d.port} sn-auth ${d.sn} omci ont-lineprofile-id 10 ont-srvprofile-id 10 desc ${d.id}

quit

service-port ${d.service} vlan ${d.vlan} gpon 0/${d.slot}/${d.port} ont ${d.ont} gemport 12 multi-service user-vlan ${d.vlan} tag-transform translate inbound traffic-table index 10 outbound traffic-table index 10

service-port desc ${d.id}

quit`);
}

/*==========================
        BIRLINK
==========================*/

function komutuGoster() {

    let d = getValues();

    show(`config

interface gpon 0/${d.slot}

ont add ${d.port} sn-auth ${d.sn} omci ont-lineprofile-id 1 ont-srvprofile-id 1 desc ${d.id}

quit

service-port ${d.service}  vlan ${d.vlan} gpon 0/${d.slot}/${d.port} ont ${d.ont} gemport ${d.gem ?? 5} multi-service user-vlan ${d.vlan} tag-transform translate inbound traffic-table index 6 outbound traffic-table index 6

service-port ${d.service}   vlan 300 gpon 0/${d.slot}/${d.port} ont ${d.ont} gemport 4 multi-service user-vlan 300 tag-transform translate inbound traffic-table index 6 outbound traffic-table index 6


display service-port port 0/${d.slot}/${d.port} ont ${d.ont}

--------------------------- BIRLINK IPTV ---------------------------


btv

igmp user add service-port ${d.multicast} no-auth

multicast-vlan 300

igmp multicast-vlan member service-port ${d.multicast}

quit

------------------------------ SIP ------------------------------

config

service-port ${d.service}   vlan 350 gpon 0/${d.slot}/${d.port} ont ${d.ont} gemport ${d.gem } multi-service user-vlan 350 tag-transform translate inbound traffic-table index 9 outbound traffic-table index 9

quit`);
}

/*==========================
      Остальные кнопки
==========================*/

function megalink() {
    let d = getValues();

    show(`config

interface gpon 0/${d.slot}

ont add ${d.port} sn-auth ${d.sn} omci ont-lineprofile-id 10 ont-srvprofile-id 10 desc ${d.id}

quit 

service-port ${d.service}  vlan ${d.vlan} gpon 0/${d.slot}/${d.port} ont ${d.ont} gemport 2 multi-service user-vlan ${d.vlan}

quit`);
}

function qaracuxur() {
    let d = getValues();

    show(`config

ont-lineprofile gpon profile-id ${d.profileId || 10} profile-name uservlan_
omcc encrypt on
tcont 1 dba-profile-id 512

gem add 1 eth tcont 1 encrypt on
gem mapping 1 0 vlan ${d.vlan}

commit

quit

interface gpon 0/${d.slot}

ont add ${d.port} sn-auth ${d.sn} omci ont-lineprofile-id ${d.profileId || 10} ont-srvprofile-id 1111 desc ${d.id}

quit

service-port ${d.service}  vlan ${d.vlan} gpon 0/${d.slot}/${d.port} ont ${d.ont} gemport 1 multi-service user-vlan ${d.vlan} tag-transform translate inbound traffic-table index 7 outbound traffic-table index 7  

quit

display ont info option run-state 0
`);
}

function connect() {
    let d = getValues();

    show(`config

interface gpon 0/${d.slot}

ont add ${d.port} sn-auth ${d.sn} omci ont-lineprofile-id 20 ont-srvprofile-id 20 desc ${d.id}

quit

service-port ${d.service} vlan ${d.vlan} gpon 0/${d.slot}/${d.port} ont ${d.ont} gemport ${d.gem} multi-service user-vlan ${d.vlan} tag-transform translate inbound traffic-table index 6 outbound traffic-table index 6  

service-port desc ${d.id}

quit

--------------------------------MODIFY--------------------------------

bdcm:
hwtc:
`);
}

function Iptv() {
    let d = getValues();

    show(`config

btv

igmp user add service-port ${d.service} no-auth

multicast-vlan ${d.multicast}

igmp multicast-vlan member service-port ${d.service}

quit

quit`);
}

function Sil() {
    let d = getValues();

    show(`config

undo service-port ${d.service}

interface gpon 0/${d.slot}

ont delete ${d.port} ${d.ont}

quit`);
}

function Iptvdel() {
    let d = getValues();

    show(`config

-----------CITYNET----------------------------------------------

btv

igmp user delete service-port ${d.service}
y

quit

quit

-----------BIRLINK----------------------------------------------

btv

igmp user delete service-port ${d.service}
y

undo service-port ${d.service}

quit`);
}

function Elaveler() {
    let d = getValues();

    show(`display service-port all | no-more

display current-configuration section global

display ont info by-desc ${d.id}

display ont info by-sn ${d.sn}

display ont wan-info 0/${d.slot}

display ont wlan-info 0/${d.slot}/${d.port}

display current-configuration service-port

display current-configuration port 0/${d.slot}

display service-port port 0/${d.slot}/${d.port} ont ${d.ont}

display ont version ${d.slot}/${d.port}/${d.ont}

--------------------------------MODIFY--------------------------------

config

interface gpon 0/${d.slot}

ont modify ${d.port} sn ${d.sn}

ont modify ${d.port} desc ${d.id}

quit

quit`);
}
