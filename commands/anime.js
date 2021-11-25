const { MessageEmbed } = require('discord.js');
const { startsWith } = require('ffmpeg-static');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    name: 'anime',
    aliases: ['a'],
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(message,args, cmd, client, Discord){

        function parseString(input) {
            input = input.replace(/<i>/g, "*")
            input = input.replace(/<\/i>/g, "*")
            input = input.replace(/<br>/g, "\n")
            input = input.replace(/<b>/g, "**")
            input = input.replace(/<\/b>/g, "**")
            input = input.substring(0, 4000)
            return input
        }

        function monthName(val) {
            switch(val) {
                case 1:
                    return "January"
                case 2:
                    return "February"
                case 3:
                    return "March"
                case 4:
                    return "April"
                case 5:
                    return "May"
                case 6:
                    return "June"
                case 7:
                    return "July"
                case 8:
                    return "August"
                case 9:
                    return "September"
                case 10:
                    return "October"
                case 11:
                    return "November"                    
                case 12:
                    return "December"       
            }
        }


        // Checks if there is second argument
        if(!args[0]) {
            message.channel.send("Need to include anime title for search!")
        }
        else {
            // The format of requested data from POST request
            var query = `
            query ($id: Int, $page: Int, $perPage: Int, $search: String) {
                Page (page: $page, perPage: $perPage) {
                    pageInfo {
                        total
                        currentPage
                        lastPage
                        hasNextPage
                        perPage
                    }
                    media (id: $id, search: $search) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    status
                    episodes
                    duration
                    genres
                    siteUrl
                    coverImage {
                        large
                        color
                    }
                    startDate {
                        year
                        month
                        day
                    }
                    endDate {
                        year
                        month
                        day
                    }
                    format
                    source
                    
                    description
                    averageScore
                    isAdult
                    studios {
                        nodes {
                                name
                        }
                    }
                    }
                }
            }
            `;
            // The variables that are searched

            let animeTitle = args.join(" ")

            var variables = {
                search: animeTitle,
                page: 1,
                perPage: 10
            };

            // Sets request parameters
            var url = 'https://graphql.anilist.co',
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query: query,
                        variables: variables
                    })
                };

            // Sends POST request and turns data returned into JSON object
            fetch(url, options).then(handleResponse)
                .then(handleData)
                .catch(handleError);

            // JSONify's data from request for data use.
            function handleResponse(response) { 
                return response.json().then(function (json) {
                    return response.ok ? json : Promise.reject(json);
                });
            }

            // Takes data and turns data into string
            function handleData(data) { 

                let pageRetrieved = data["data"].Page.media
                let num = 0
                let isAnime = false
                let f = ''
                for(i = 0; i < pageRetrieved.length; i++) {

                    console.log(`Format Type: ${pageRetrieved[i].format}`)
                    num = i
                    f = pageRetrieved[i].format
                    if(f == "ANIME" || f == "MOVIE" || f == "TV" || f == "ONA" || f == "OVA" || f == "TV_SHORT") {
                        isAnime = true
                        break;
                    }
                }
                if(isAnime == false)    {
                    message.channel.send("No anime found or search didn't pick up name... Try being more specific!")
                }
                else {
                    if(pageRetrieved[num].isAdult) {
                        message.channel.send("No u horni (Anime found is R18+!!)")
                    }
                    else {

                    // for (let i = 0; i < 1; i++) {
                        let min = ""
                        let desc
                        let genreString = pageRetrieved[num].genres.join(", ")
                        if(pageRetrieved[num].status = "RELEASING") {
                            pageRetrieved[num].status = "Ongoing/Planned"
                            pageRetrieved[num].episodes = ""
                        }
                        else {
                            pageRetrieved[num].status = "Finished" 
                        }
                        if(typeof pageRetrieved[num].averageScore !== "number") {
                            pageRetrieved[num].averageScore = "Not Rated"
                        }
                        if(typeof pageRetrieved[num].description !== "string") {
                            desc = "N/A"
                        } else {
                            desc = pageRetrieved[num].description
                        }
                        if(typeof pageRetrieved[num].duration === "number") {
                            min = `, ${pageRetrieved[num].duration} minutes`
                        }
                        let aniDate = ""
                        let sMonth = pageRetrieved[num].startDate.month
                        console.log(sMonth)
                        if(typeof pageRetrieved[num].startDate.day !== "number") {
                            aniDate = `Starts airing ${monthName(pageRetrieved[num].startDate.month)}, ${pageRetrieved[num].startDate.year}`
                        }
                        else if(typeof pageRetrieved[num].endDate.day !== "number") {
                            aniDate = `Started airing ${monthName(pageRetrieved[num].startDate.month)} ${pageRetrieved[num].startDate.day}, ${pageRetrieved[num].startDate.year}`
                        }
                        else {
                            aniDate = `Aired ${monthName(sMonth)} ${pageRetrieved[num].startDate.day}, ${pageRetrieved[num].startDate.year} - ${monthName(pageRetrieved[num].endDate.month)} ${pageRetrieved[num].endDate.day}, ${pageRetrieved[num].endDate.year}`
                        }

                        let studiosList = ""
                        let allStudios = pageRetrieved[num].studios.nodes
                        for(let i = 0; i < allStudios.length; i++) {
                            studiosList += `${allStudios[i].name}\n`
                            console.log(`${allStudios[i]} ${allStudios[i].name}`)
                        }
                        if(studiosList.length < 1) studiosList = "N/A"
                        const animeEmbed = {
                                color: pageRetrieved[num].coverImage.color,
                                title: pageRetrieved[num].title.romaji,
                                url: pageRetrieved[num].siteUrl,
                                description: parseString(desc),
                                thumbnail: {
                                    url: pageRetrieved[num].coverImage.large,
                                },
                                fields: [
                                    {
                                        name: `Alternative Names`,
                                        value: `Native: ${pageRetrieved[num].title.native}\nEnglish: ${pageRetrieved[num].title.english}`,
                                    },
                                    {
                                        name: `Genres`,
                                        value: genreString,
                                    },
                                    {
                                        name: `Average Score`,
                                        value: `${pageRetrieved[num].averageScore}%`,
                                    },
                                    {
                                        name: `Episodes`,
                                        value: `${pageRetrieved[num].status} ${pageRetrieved[num].episodes} episodes${min}`,
                                    },
                                    {
                                        name: `Airing Date`,
                                        value: aniDate,
                                    },
                                    {
                                        name: `Source`,
                                        value: `${pageRetrieved[num].source.charAt(0).toUpperCase() + pageRetrieved[num].source.slice(1).toLowerCase()}`,
                                    },
                                    {
                                        name: `Studios`,
                                        value: studiosList,
                                    },
                                ]
                            }
                            message.channel.send({embeds: [animeEmbed]})
                        };

                        
                    }
                }
            }
            // Catches any error
            function handleError(error) { 
                console.error(error);
            }
        }
    }

