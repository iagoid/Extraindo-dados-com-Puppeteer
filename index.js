const puppeteer = require();
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://instagram.com/rocketseat_oficial/');
    // await page.screenshot({path: 'instagram.png'});

    const imgList = await page.evaluate(() => {
        // Toda essa função será executada no browser
        // vamor pegar todas as imgens na parte de postts
        const nodeList = document.querySelectorAll('article img')
        // transformar o NodeList em array
        const imgArray = [...nodeList]
        // transformar os nodes(elementos html) em objetos JS
        const imgList = imgArray.map(({
            src
        }) => ({
            src
        }))

        // colocar para fora da função
        return imgList
    })

    // escrever os dados em um arquivo local
    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
        if (err) throw new Error('Algo deu errado')

        console.log('Tudo deu certo')
    })

    await browser.close();
})();