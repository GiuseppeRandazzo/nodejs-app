// dubito.it
class ModelUser {
  primarykey: number;
  username: string;
  email: string;
  password: string;
  primaryKeyUser!: number;
  constructor(username: string, email: string, password: string) {
    this.primarykey = Math.random();
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

class ModelAd {
  primarykey: number;
  referencekeyUser: number;
  title: string;
  description: string;
  price: string;
  category: string;
  urlphoto: string;
  constructor(
    referencekeyUser: number,
    title: string,
    description: string,
    price: string,
    category: string,
    urlphoto: string
  ) {
    this.primarykey = Math.random();
    this.referencekeyUser = referencekeyUser;
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.urlphoto = urlphoto;
  }
}

class ModelReview {
  primarykey: number;
  referencekeyUser: any;
  referencekeyAd: any;
  title: any;
  description: any;
  rating: any;
  date: Date;
  constructor(
    referencekeyUser: string,
    referencekeyAd: string,
    title: string,
    description: string,
    rating: string
  ) {
    this.primarykey = Math.random();
    this.referencekeyUser = referencekeyUser;
    this.referencekeyAd = referencekeyAd;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.date = new Date();
  }
}

class ModelAuth {
  primarykey: number;
  referencekeyUser: number;
  token: number;
  constructor(referencekeyUser: number) {
    this.primarykey = Math.random();
    this.referencekeyUser = referencekeyUser;
    this.token = Math.random();
  }
}

class ModelReport {
  primarykey: number;
  referencekeyUser: number;
  referencekeyAd: number;
  description: string;
  status: string;
  constructor(
    idUser: number,
    idAd: number,
    description: string,
    status: string
  ) {
    this.primarykey = Math.random();
    this.referencekeyUser = idUser;
    this.referencekeyAd = idAd;
    this.description = description;
    this.status = status;
  }
}

class modelFavorite {
  primarykey: number;
  referencekeyUser: number;
  referencekeyAd: number;
  constructor(idUser: number, idAd: number) {
    this.primarykey = Math.random();
    this.referencekeyUser = idUser;
    this.referencekeyAd = idAd;
  }
}

class ModelDevice {
  primarykey: number;
  referencekeyUser: number;
  referencekeyAd: number;
  constructor(idUser: number, idAd: number) {
    this.primarykey = Math.random();
    this.referencekeyUser = idUser;
    this.referencekeyAd = idAd;
  }
}

class Marketplace {
  user: Array<ModelUser> = [];
  ad: Array<ModelAd> = [];
  review: Array<ModelReview> = [];
  auth: Array<ModelAuth> = [];
  report: Array<ModelReport> = [];
  favorite: Array<modelFavorite> = [];
  device: Array<ModelDevice> = [];
  users: any;

  login(email: string, password: string) {
    const userfound = this.user.find(function (user) {
      if (user.email === email && user.password === password) return true;
      else return false;
    });
    if (!!userfound) {
      const newAuth = new ModelAuth(userfound.primaryKeyUser);
      this.auth = [...this.auth, newAuth];
      return newAuth.token;
    } else console.log("Ma chi minchia sei?");
  }

  logout(token: number) {
    const authFound = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });
    if (!!authFound) {
      this.auth = this.auth.filter(function (auth) {
        if (auth.token === token) return false;
        else return true;
      });
      console.log("logout effettuato con successo");
    } else console.log("token non valido");
  }

  register(email: string, password: string) {
    const userfound = this.users.find(function (user: { email: string }) {
      if (user.email === email) return true;
      else return false;
    });

    if (!!userfound) console.log("utente gia registrato");
    else {
      const newUser = new ModelUser(email, email, password);
      this.users = [...this.users, newUser];
      console.log("Registrazione effettuata con successo");
    }
  }

  isTokenValid(token: number) {
    const authFound = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });
    if (!!authFound) return true;
    else return false;
  }

  getAuthUserbytoken(token: number) {
    const authFound = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });
    if (!!authFound) return authFound;
    else return null;
  }

  addFavorite(token: number, referencekeyUser: number, referencekeyAd: number) {
    const userAuth = this.getAuthUserbytoken(token);
    if (!userAuth) console.log("Token non valido");
    else {
      const newFavorite = new modelFavorite(referencekeyUser, referencekeyAd);
      this.favorite = [...this.favorite, newFavorite];
      console.log("aggiunto ai preferiti");
    }
  }
  createad(
    token: number,
    referencekeyUser: number,
    title: string,
    description: string,
    price: string,
    category: string,
    urlphoto: string
  ) {
    const authFound = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });
    if (!!authFound) {
      console.log("Token non valido");
    } else {
      const newAd = new ModelAd(
        referencekeyUser,
        title,
        description,
        price,
        category,
        urlphoto
      );
      this.ad = [...this.ad, newAd];
      console.log("Annuncio creato con successo");
    }
  }

  deletead(
    token: number,
    referencekeyUser: any,
    title: any,
    description: any,
    price: any,
    category: any,
    urlphoto: any
  ) {
    const authFound = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      else return false;
    });
    if (!!authFound) return authFound;
  }

  modifiedad(
    referencekeyUser: any,
    title: any,
    description: any,
    price: any,
    category: any,
    urlphoto: any
  ) {}

  createreview(
    referencekeyUser: any,
    referencekeyAd: any,
    title: any,
    description: any,
    rating: any
  ) {}

  modifiedreview(
    referencekeyUser: any,
    referencekeyAd: any,
    title: any,
    description: any,
    rating: any
  ) {}

  deletereview(
    referencekeyUser: any,
    referencekeyAd: any,
    title: any,
    description: any,
    rating: any
  ) {}

  deleteaccount(referencekeyUser: any) {}

  modfiedusername(referencekeyUser: any, username: any) {}
}
