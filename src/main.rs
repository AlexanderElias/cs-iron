extern crate iron;
extern crate router;
extern crate staticfile;
extern crate mount;
extern crate handlebars_iron;
extern crate urlencoded;
extern crate rustc_serialize;

use iron::prelude::*;
use iron::status;
use router::Router;
use staticfile::Static;
use mount::Mount;
use handlebars_iron::{Template, HandlebarsEngine};
use urlencoded::UrlEncodedBody;
use rustc_serialize::json::{ToJson};

use std::path::Path;
// use std::io::Read;
use std::collections::{BTreeMap};
use std::process::Command;

fn main() {

    let mut router = Router::new();

    //Routes
    fn index(req: &mut Request) -> IronResult<Response> {
        let mut res = Response::new();
        let mut data = BTreeMap::new();
        data.insert("tab-title".to_string(), "Verge | Web Development, Design, and SEO Company In Tucson".to_json());
        data.insert("title".to_string(), "<object type=\"image/svg+xml\" data=\"/public/svg/Verge-Logo.svg\">VERGE</object>".to_json());
        data.insert("sub-title".to_string(), "Web Development".to_json());
        data.insert("hint".to_string(), "<div id=\"hint\"><span id=\"message\">Use Arrow Keys</span><div><span id=\"arrow\">&#8964;</span></div></div>".to_json());

        res.set_mut(Template::new("index", data)).set_mut(status::Ok);
        Ok(res)
    };
    fn contact(req: &mut Request) -> IronResult<Response> {
        let mut res = Response::new();
        let mut data = BTreeMap::new();
        data.insert("tab-title".to_string(), "Contact Us | Web Development, Design, and SEO Company In Tucson".to_json());
        data.insert("title".to_string(), "Contact Us".to_json());
        data.insert("sub-title".to_string(), "".to_json());

        res.set_mut(Template::new("contact", data)).set_mut(status::Ok);
        Ok(res)
    };
    fn submit(req: &mut Request) -> IronResult<Response> {
        // Gets the Encoded URL from the Post
        let data = req.get_ref::<UrlEncodedBody>();
        let lastname = data.unwrap();
        println!("{}", lastname["lastname"][0]);

        Ok(Response::with( (status::Ok, "post") ))
    };
    fn about(re: &mut Request) -> IronResult<Response> {
        let mut res = Response::new();
        let mut data = BTreeMap::new();
        data.insert("tab-title".to_string(), "About Us | Web Development, Design, and SEO Company In Tucson".to_json());
        data.insert("title".to_string(), "About Us".to_json());
        data.insert("sub-title".to_string(), "".to_json());

        res.set_mut(Template::new("about", data)).set_mut(status::Ok);
        Ok(res)
    };
    //Routes


    //Add routes to router
    router.get("/", index).get("/contact", contact).post("/submit", submit ).get("/about", about);

    //Chaing link the router
    let mut chain = Chain::new(router);
    //Define where the files are located(./views/) and add the extension(.hbs)
    chain.link_after(HandlebarsEngine::new("./views/", ".html"));

    //Add Chain to the Mounts and add a Static directory
    let mut mounts = Mount::new();
    mounts
        .mount("/", chain)
        .mount("/public", Static::new(Path::new("views/public/")) );


    //Add Mounts to the server
    Iron::new( mounts ).http("localhost:8080").unwrap();
}
