import { withIronSessionSsr } from "iron-session/next";
import { NextPage } from "next"
import { LOGIN_IRON_OPTION, NORMAL_IRON_OPTION } from "../../../models/constants";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(ctx) {
      const user = ctx.req?.session.user;
  
      if (!user || user.isAdmin !== true) {
        return {
          notFound: true,
        };
      }
  
      return {
        props: {
          user: ctx.req.session.user,
        },
      };
    },
    NORMAL_IRON_OPTION
  );

const AddNewResource: NextPage = () => {
    return <>This is a page to add new resource</>
}

export default AddNewResource