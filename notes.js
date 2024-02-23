const fs = require('fs');
const chalk = require('chalk');
const getNotes = (title) => {
    const notes = loaddata();
    const findnote = notes.find((note) => note.title === title);
    if (findnote) {
        console.log(chalk.inverse(findnote.title));
        console.log(findnote.body)
    }
    else console.log(chalk.red.inverse("Note not found"))
}
const adddata = (title, body) => {
    const data = loaddata();
    const duplicatenote = data.find((note) => note.title === title)
    debugger
    if (!duplicatenote) {
        data.push({
            title: title,
            body: body
        })
        savedata(data)
        console.log("saving data")
    }
    else console.log("Title already exist")

}
const savedata = (data) => {
    const datajson = JSON.stringify(data);
    fs.writeFileSync('notes.json', datajson);
}

const loaddata = () => {
    try {
        const databuffer = fs.readFileSync('notes.json');
        const rddata = databuffer.toString();
        const requiredData = JSON.parse(rddata);
        return requiredData;
    } catch (error) {
        return [];
    }

}
const removenotes = (title) => {
    const ndata = loaddata();
    const initial = ndata.length;
    const leftdata = ndata.filter((note) => note.title !== title)
    const final = leftdata.length;
    if (initial === final) {
        console.log(chalk.red.inverse(title + " does not exist."));
    }
    else {
        savedata(leftdata);
        console.log(chalk.green.inverse("removing notes " + title));
    }


}
const listdata = () => {
    const notes = loaddata();
    console.log(chalk.yellow.inverse("Your notes"))
    notes.forEach((note) => {
        console.log(chalk.red("Title: ") + note.title)
        console.log(chalk.red("Content: ") + note.body)
    });
}

module.exports = {
    getNotes: getNotes,
    adddata: adddata,
    removenotes: removenotes,
    listdata: listdata
}