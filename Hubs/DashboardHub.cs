using Microsoft.AspNetCore.SignalR;
using ReactSignalR.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReactSignalR.Hubs
{

    public interface IDashboardClient{
        Task ReceiveTickerChange(string ticker);

        Task ReceiveColorChange(string colorType);

        Task ReceiveChangeData(IEnumerable<UserSentimentDataItem> data);
    }

   public class DashboardHub : Hub<IDashboardClient>
    {
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");            
            await base.OnConnectedAsync();            
        }
        public async Task SendTicker(string ticker)
        {
            await Clients.All.ReceiveTickerChange(ticker);
        }

        public async Task SendColorChange(string colorType)
        {
            await Clients.All.ReceiveColorChange(colorType);
        }

        public async Task SendDataChange(IEnumerable<UserSentimentDataItem> data)
        {
            await Clients.All.ReceiveChangeData(data);
        }
    }
}