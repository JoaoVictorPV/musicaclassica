using System;
using System.IO;
using System.Net;
using System.Diagnostics;
using System.Threading;
using System.Windows.Forms;

class Launcher {
  static string Site = "http://127.0.0.1:4173/";
  static bool Ready() {
    try { var req=(HttpWebRequest)WebRequest.Create(Site+"health"); req.Timeout=700;
      using(var r=req.GetResponse()) using(var s=new StreamReader(r.GetResponseStream())) return s.ReadToEnd().Contains("\"app\":\"constelacao\"");
    } catch { return false; }
  }
  [STAThread] static void Main() {
    try {
      string dir=AppDomain.CurrentDomain.BaseDirectory;
      if(!Ready()) {
        string node=Path.Combine(dir,"runtime","node.exe");
        if(!File.Exists(node)) throw new Exception("O runtime não foi encontrado. Mantenha a pasta runtime junto do executável.");
        var start=new ProcessStartInfo(node,"\""+Path.Combine(dir,"server.cjs")+"\"");
        start.WorkingDirectory=dir;start.UseShellExecute=false;start.CreateNoWindow=true;start.WindowStyle=ProcessWindowStyle.Hidden;
        Process.Start(start);
        for(int i=0;i<70&&!Ready();i++) Thread.Sleep(150);
        if(!Ready()) throw new Exception("Não foi possível iniciar na porta 4173. Outro programa pode estar usando essa porta. Feche-o e tente novamente.");
      }
      string[] candidates={Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles),"Google","Chrome","Application","chrome.exe"),Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),"Google","Chrome","Application","chrome.exe"),Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),"Google","Chrome","Application","chrome.exe")};
      foreach(string chrome in candidates) if(File.Exists(chrome)){Process.Start(new ProcessStartInfo(chrome,"--app="+Site){UseShellExecute=true});return;}
      Process.Start(new ProcessStartInfo(Site){UseShellExecute=true});
    } catch(Exception ex){MessageBox.Show(ex.Message,"Acervo Clássico",MessageBoxButtons.OK,MessageBoxIcon.Information);}
  }
}
