import PageHeader from "./common/PageHeader";

const AboutUs = () => {
  return (
    <>
      <PageHeader
        title="About Yummy Recipes"
        description={
          <>
            Yummy Recipe is my first full site project, front + back hand <br />
            Java-Script & React & node.js & mongoDB & Css & SASS. <br />
            The site allows connection in two ways, normal and premium. <br /> A
            normal account can search for recipes according to the many
            searchable categories, and can view them. <br />
            A premium user can also add recipes to his favorite list and add
            missing ingredients to his shopping list, edit it and add to the
            list whatever he wants. <br /> Of course, everything is saved and
            shown to the user when he logs in with his account.
          </>
        }
      />
      <div className="logo-img">
        <img src={require("../images/y (2).png")} alt="" className="image" />
      </div>
    </>
  );
};

export default AboutUs;
