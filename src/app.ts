import create_app, { Application, json } from "express";
const express = require("express");
const path = require("path");
import cors from "cors";
import router from "./router";

class App {
  private name: string;
  private port: number;
  private app: Application;
  constructor(name: string, port: number) {
    this.name = name;
    this.port = port;
    this.app = create_app();
    this.setUp();
  }

  private setUp() {
    this.setupMiddleware();
    this.setupRouter();
  }
  private setupMiddleware() {
    this.app.use(json());
    this.app.use(
      cors({
        origin: [process.env.CLIENT_DOMAIN, process.env.CLIENT_HOST],
      })
    );
    this.app.use("/static",express.static(path.join(__dirname, "../scorm")));
    
  }
  private setupRouter() {
    this.app.use(router);
  }



  public listen() {
    // this.app.use("/static", express.static(path.join(__dirname, "public")));
    this.app.listen(this.port, () => {
      console.log(`${this.name} is running on port ${this.port}`);
    });
  }
}

export { App };
