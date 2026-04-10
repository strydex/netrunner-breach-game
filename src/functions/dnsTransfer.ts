import { net } from "../data/network";

// functions called from terminals when networked commands called
// e.g. ssh, irc, scp
// takes in input of terminal command arguement and checks if argument matches known ip
// if yes, returns matching network location data as object

export function dnsTransfer(ip: string) {
  switch (ip) {
    case net.edgerunnerFTP._ipAddress:
      return net.edgerunnerFTP;
    case net.resoAgwe._ipAddress:
      return net.resoAgwe;
    case net.angryDaemons._ipAddress:
      return net.angryDaemons;
    default:
      return ip + ": IP-адрес не найден в DNS-кэше";
  }
}

export function ircTransfer(ip: string) {
  switch (ip) {
      case net.seventhCircle._ipAddress:
      return net.seventhCircle;
    default:
      return ip + ": IP-адрес не найден в IRC DNS-кэше";
  }
}
