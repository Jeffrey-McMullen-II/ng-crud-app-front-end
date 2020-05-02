import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //ng build --prod --base-href ./

  /*
      "/api/*": {
      "target": "http://localhost:8080/crud-app",
      "secure": true,
      "logLevel": "debug",
      "ws": true
    }
  */

    //userUrl = `http://jaygames.x10host.com/symphart/public/api/users`;
    //userUrl = `http://10.0.0.109:80/symphart/public/api/users`;
    //userUrl = `http://10.0.0.109:8081/crud-app/api/users`;

  title = 'CRUD App';
}
