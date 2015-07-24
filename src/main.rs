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
use std::collections::{BTreeMap};

extern crate ssmtp;
use ssmtp::email;


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
    fn confirmation(req: &mut Request) -> IronResult<Response> {
        // Gets the Encoded URL from the Post
        let post_data = req.get_ref::<UrlEncodedBody>();
        let ref post_data = post_data.unwrap();
        let ref first_name = post_data["firstname"][0];
        let ref last_name = post_data["lastname"][0];
        let ref phone = post_data["phone"][0];
        let ref email = post_data["email"][0];
        let ref message = post_data["message"][0];

        let contact_form_message = "Name: ".to_string() + &first_name + " " + &last_name + "<br/>";
        let contact_form_message = contact_form_message + "Phone: " + &phone + "<br/>" ;
        let contact_form_message = contact_form_message + "Email: " + &email + "<br/>" ;
        let contact_form_message = contact_form_message + "Message: " + &message;
        let html_open = "<html><body style=\"text-align:center;color:black;\"><h2>".to_string();
        let html_close = "</h2></body></html>".to_string();
        let email_body = html_open + &contact_form_message + &html_close;

        email::create(
            "contact.form@verge.website",
            "alex.steven.elias@gmail.com",
            "Contact Form Inquiry",
            &email_body
        );
        email::send("alex.steven.elias@gmail.com");

        let mut res = Response::new();
        let mut data = BTreeMap::new();
        data.insert("title".to_string(), "Confirmation".to_json());
        data.insert("sub-title".to_string(), "".to_json());
        data.insert("tab-title".to_string(), "Confirmation".to_json());
        res.set_mut(Template::new("confirmation", data)).set_mut(status::Ok);
        Ok(res)
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
    router.get("/", index).get("/contact", contact).post("/confirmation", confirmation ).get("/about", about);

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
    Iron::new( mounts ).http("0.0.0.0:3000").unwrap();
}
