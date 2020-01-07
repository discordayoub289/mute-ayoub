const { RichEmbed } = require("discord.js");
const ms = require("ms");

module.exports = async (client, options) => {
    const muteMessage = (options && options.muteMessage) || "was muted since we don't like too much advertisement type people!";
    const mutedRole = (options && options.mutedRole) || "muted";
    const mprefix = (options && options.mprefix) || "#";
    const mutecmd = (options && options.mutecmd) || "mute";
    if(!isNaN(muteMessage) || muteMessage.length < 5) throw new Error("ERROR: <muteMessage> option must be a string and have at least 5 characters long (Including space).");
    if(!isNaN(mutecmd)) throw new Error("ERROR: <muteMessage> option must be a string.");
    client.on("checkMessage", async (m) => {
        let clock = new Date();
        let ss = String(clock.getSeconds()).padStart(2, '0');
        let min = String(clock.getMinutes()).padStart(2, '0');
        let hrs = String(clock.getHours()).padStart(1, '0');
        clock = hrs + ':' + min +':' + ss;
        let TheDate = new Date()
        let zilelesaptamanii = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let weekday = zilelesaptamanii[TheDate.getDay()];
        let dd = String(TheDate.getDate()).padStart(2, '0');
        let mon = String(TheDate.getMonth()+ 1);
        let year = String(TheDate.getFullYear()).padStart(4,'00');
        TheDate = weekday+", " + mon + '/' + dd +'/' + year;
        let amORpm;
        if(hrs >= 0 && hrs <= 12){
            amORpm = "AM"
        }else{
            amORpm = "PM"
        };
        if(m.content.startsWith(mprefix+mutecmd)) {
            let user = m.mentions.users.first() || m.guild.members.get(m.content.split(" ").slice(1))
            let re = m.content.split(" ").slice(3).join(" ")
            let time = m.content.split(" ").slice(2).join(" ")
            let role = m.guild.roles.find(namae => namae.name === mutedRole);      
            if (!role) {
                try {
                    role = await m.guild.createRole({
                        name: "muted",
                        color: "#000000",
                        permissions: []
                    })
                    m.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(role, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SEND_TTS_MESSAGES: false,
                            ATTACH_FILES: false
                        });
                    });
                    ReportChannel.send(`Created **\`muted\`** role since a role(to be applied to muted person) wasn't provided from beginning when setting up the module.`) 
                } catch (e) {
                    console.log(e.stack);
                }
            }
            if(user) {
                user.addRole(role).then(()=>{
                    m.channel.send(`<@!${m.author.id}>, ${muteMessage}`);
                    let muteEmbed = new RichEmbed()
                    .setAuthor(' Action | Mute')
                    .addField('Member muted:',`${user}`)
                    .addField(`How much time got muted?:`,`${time}.`)
                    .addField('Reason of mute: ', `${re?re:"no reason"}`)
                    .addField(`When it was muted that person:`,TheDate+ " at "+ clock+" "+amORpm)
                    .setColor('#D9D900')
                    m.channel.send(muteEmbed);
                    setTimeout(()=>{
                        user.removeRole(role);
                    }, ms(time));
                    return true;
                }).catch((e) => {
                    m.guild.owner.send(`Oops, seems like i don't have sufficient permissions to mute <@!${user.id}>!*`);
                    return false;
                });
            }
        }
    })
}
