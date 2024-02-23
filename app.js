const chalk = require("chalk");
const yargs = require("yargs");
const Notes = require("./notes");

// customizing yargs version
yargs.version('1.1.0');


// creating add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true, // we define it true so that it required to give title
            type: 'string' //title needs to be in string
        },
        body: {
            describe: 'content of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        Notes.adddata(argv.title, argv.body);
    }
})

//creating remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: "title to remove",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        Notes.removenotes(argv.title)
    }
})

// creating list command
yargs.command({
    command: "list",
    describe: "list the note",
    handler() {
        Notes.listdata()
    }
})

// creating read/getnote command
yargs.command({
    command: "read",
    describe: "read the note",
    builder: {
        title: {
            describe: 'note to read',
            demandOption: true,
            type: 'string'

        }
    },
    handler(argv) {
        Notes.getNotes(argv.title)
    }
})



yargs.parse();
