/* eslint-disable no-unused-vars */

import ProtectedPage from "../cmps/common/ProtectedPage";
import {Home,MediaDetail,PersonDetail,MediaSearch,MediaList,PasswordUpdate,ReviewList,FavoriteList} from "../pages"
const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
};


const routes=[
    {
        index:true,
        element:<Home />,
        state: "home"
    },
    {
        path: "/person/:personId",
        element: <PersonDetail />,
        state: "person.detail"
      },
      {
        path: "/search",
        element: <MediaSearch />,
        state: "search"
      },
      {
        path: "/password-update",
        element: (
          <ProtectedPage>
            <PasswordUpdate />
          </ProtectedPage>
        ),
        state: "password.update"
      },
      {
        path: "/favorites",
        element: (
          <ProtectedPage>
            <FavoriteList />
          </ProtectedPage>
        ),
        state: "favorites"
      },
      {
        path: "/reviews",
        element: (
          <ProtectedPage>
            <ReviewList />
          </ProtectedPage>
        ),
        state: "reviews"
      },
      {
        path: "/:mediaType",
        element: <MediaList />
      },
      {
        path: "/:mediaType/:mediaId",
        element: <MediaDetail />
      }
    ];
    
    export default routes;
