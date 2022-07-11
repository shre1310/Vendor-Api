const PORT = 8001;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express')

const app = express()

const vendor =[
    {
        vendor: 'git-feature-analytics',
        address: 'https://newunicorn-git-feature-analytics-livzz.vercel.app/' 
    },
    {
        vendor: 'vercel-app',
        address: 'https://newunicorn.vercel.app/'

    }
]

const dashboard= []

app.get('/', (req, res)=> {
    res.json("welcome")
})

app.get('/vendor', (req, res)=> {
    axios.get('https://posthog.skara.live/dashboard/')
        .then((response)=>{
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("")',html).each(function() {
                const name = $(this).text()
                const url = $(this).attr('href')

                dashboard.push({
                    name,
                    url
                })
            })
            res.json(dashboard)
        }).catch((err)=> console.log(err))
})



