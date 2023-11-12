import axios from "axios";


const modify_expressions = (expressions: string[]) => {
    return expressions
    .map(expression => {
        return expression.replace(/[!?.'’]/g, '');
    }).map(expression => expression.toLowerCase());
}

async function scrape_data(url: string, regex: RegExp): Promise<string[]> {
    const response = await axios.get(url);
    console.log(response.data)
    const matches = response.data.matchAll(regex);
    const matches_array = [...matches]
    console.log(matches_array)
    return matches ? matches_array.filter(Boolean).map((match: any) => match[1]) : [];

    // Convert to lowecase and remove exclamation, question marks or periods
    // return modify_expressions(expressions);
}

const scraping_info = [
    // {
    //     regex: /<h3>\d+\.\s*(.*?)<\/h3>/g,
    //     urls: [
    //         "https://www.tandem.net/blog/20-greetings-in-english"
    //     ]
    // },
    {
        regex: /<p><b>\d+\.\s*(.*?)\s*<\/b>\s*(<br>)?\s*<\/p>/g,
        urls: [
            "https://oxfordlanguageclub.com/page/blog/17-smart-ways-to-say-goodbye-in-english"
        ]
    }
]

scraping_info.forEach(async scraping => {
    const results = await Promise.all(scraping.urls.map(url => scrape_data(url, scraping.regex)));
    console.log(results.flat());
})