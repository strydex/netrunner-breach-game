import { isArrayEmpty} from "./isEmpty";
import { genRand } from "./randStr";

export class Character {
    _name: string;
    _alias: string;
    _greeting: string;
    _advice: string;
    _resoAgweAdvice: string;
    _zer0Warning: string;
    _status: string;
    _connectionStatus: string;
    _pfp: string;
    _userID: string;
    _ircChannel: unknown;

    constructor(name: string, alias: string, greeting: string, advice: string, resoAgweAdvice: string, zer0Warning: string, status: string, connectionStatus: string, pfp: string) {
        this._name = name;
        this._alias = alias;
        this._greeting = greeting;
        this._advice = advice;
        this._resoAgweAdvice = resoAgweAdvice;
        this._zer0Warning = zer0Warning;
        this._status = status;
        this._connectionStatus = connectionStatus;
        this._pfp = pfp;
        this._userID = genRand(16)
        this._ircChannel = {}
    }
    linkToIRC(netLoc: unknown){
        this._ircChannel = netLoc
    }
}

export class Directory {
  _dirName: string;
  _linkedParentDir: any;
  _linkedDirs: Record<string, any>;
  _fileDirLink: Record<string, any>;

  constructor(dirName: string) {
    this._dirName = dirName;
    this._linkedParentDir = {}
    this._linkedDirs = {};
    this._fileDirLink = {};
  }
    linkParentDirectory(directory: any){
        this._linkedParentDir = directory
    }
    linkDirectories(index: string, directoryToLink: any){
        this._linkedDirs[index] = directoryToLink
    }
    linkFiles(name: string, file: any){
        this._fileDirLink[name] = file
    }

    ls(){ // list directories and files in current directory
        const directoryList = Object.values(this._linkedDirs)
            .map((directory) => directory?._dirName)
            .filter(Boolean)
            .map((dirName) => dirName + "/");
        const fileList = Object.values(this._fileDirLink)
            .map((file) => file?._fileName)
            .filter(Boolean);
        const outputList = [...directoryList, ...fileList];

        if (outputList.length === 0){
            return " ~~ директория пуста ";
        }
        return outputList.join(" ");
    }

    cat(fileSearch: string){ // print file in this directory
        if (fileSearch in this._fileDirLink){
            const file = Object.getOwnPropertyDescriptor(this._fileDirLink, fileSearch).value
            return file._fileInfo
        } else return " ~~ нет такого файла"
    }
    file(fileSearch: string){ // print metadata of file in this directory
        if (fileSearch in this._fileDirLink){
            const file = Object.getOwnPropertyDescriptor(this._fileDirLink, fileSearch).value
            return file
        } else return " ~~ нет такого файла"
}

    steghide(fileSearch: string){ // print hidden data of file in this directory
        if (fileSearch in this._fileDirLink){
            const file = Object.getOwnPropertyDescriptor(this._fileDirLink, fileSearch).value
            if (file._fileHiddenInfo === "n/a"){
                return " файл не содержит скрытых данных"
            } else return file._fileHiddenInfo
        } else return " ~~ нет такого файла"
    }
    cd(directory: string) { // change to a directory linked to this one
        if (directory === ".."){
            if (isArrayEmpty(this._linkedParentDir) === true){
                return this
            } else {
                return this._linkedParentDir
            }
        } else if (directory in this._linkedDirs){
            const dir = Object.getOwnPropertyDescriptor(this._linkedDirs, directory).value
            return dir
        } else {
            return this
        }
    }

}

export class File {
    _fileName: string;
    _fileType: string;
    _fileAccess: string;
    _fileOwner: string;
    _fileCreator: string;
    _fileInfo: string;
    _fileHiddenInfo: string;

    constructor(fileName: string, fileType: string, fileAccess: string, fileOwner: string, fileCreator: string, fileInfo: string, fileHiddenInfo: string) {
        this._fileName = fileName;
        this._fileType = fileType;
        this._fileAccess = fileAccess;
        this._fileOwner = fileOwner;
        this._fileCreator = fileCreator;
        this._fileInfo = fileInfo;
        this._fileHiddenInfo = fileHiddenInfo;
    }
}
export class IRC {
    _name: string;
    _tagline: string;
    _network: unknown;
    _members: Record<string, any>;
    _messageHistory: string[];

    constructor(name: string, tagline: string){
        this._name = name;
        this._tagline = tagline
        this._network = {}
        this._members = {}
        this._messageHistory = []
    }
    linkMember(member: Record<string, any>){ // add member(s) to irc channel 
        this._members = member
    }
    assignNetwork(net: unknown){ // assing irc channel to network location
        this._network = net
    }
    appendMessage(user: string, message: string){
        this._messageHistory.push("[" + user + "]: " + message)
    }
    findUser(alias: string){ // check in inputed user is in this irc channel
        if (alias in this._members){
            return Object.getOwnPropertyDescriptor(this._members, alias).value
        } else {
            return " ~~ нет такого пользователя"
        }
    }
}

export class NetworkLocation{
    _netLocName: string;
    _ipAddress: string;
    _password: string;
    _linkedNetworkDirectories: any;

    constructor(netLocName: string, ipAddress: string, password: string){
        this._netLocName = netLocName;
        this._ipAddress = ipAddress;
        this._password = password;
        this._linkedNetworkDirectories = {}
    }
    linkNetworkedDirectories(directories: any){ // link network location and directory
        this._linkedNetworkDirectories = directories
    }
}
