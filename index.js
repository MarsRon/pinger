require("dotenv").config();
const { head, post } = require("axios").default;
const sites = process.env.SITES.split(" ");

require("http").createServer((req, res) => {
	res.end("okay");
	for (const site of sites)
		head(site, { timeout: 10000 })
			.then(res => console.log(`${new URL(site).hostname}: ${res.statusText}`))
			.catch(({ status }) => {
				console.log(`${site} is down | Status: \`${status}\``);
				post(process.env.DISCORD_WEBHOOK, {
					content: `<@${process.env.OWNERID}>`,
					embeds: [{
						title: "SITE IS DOWN",
						description: `${site} is down\nStatus: \`${status}\``,
						color: 16013612
					}]
				});
			});
}).listen(3000);

console.log("Repl Pinger is now running!");