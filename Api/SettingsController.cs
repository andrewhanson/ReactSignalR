using System;
using Microsoft.AspNetCore.Mvc;
using ReactSignalR.Hubs;
using Microsoft.AspNetCore.SignalR;
using ReactSignalR.ViewModels;

namespace ReactSignalR.Api{

    [Route("/api/settings")]
    public class SettingsController: Controller{

        public SettingsController(IHubContext<DashboardHub> hubContext){

        }
        public IActionResult Get(){
            return Ok("From Settings");
        }
    }
}