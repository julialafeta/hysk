// Profile dispatcher – picks the right layout based on person.layout (default: 1)
// To assign a layout to a person, set person.layout = 2 / 3 / 4 in people.jsx
// Future layouts: ProfileLayout2, ProfileLayout3, ProfileLayout4

function Profile(props) {
  const layout = (props.person && props.person.layout) || 1;
  let Layout;
  switch (layout) {
    case 1: Layout = window.ProfileLayout1; break;
    // case 2: Layout = window.ProfileLayout2; break;
    // case 3: Layout = window.ProfileLayout3; break;
    // case 4: Layout = window.ProfileLayout4; break;
    default: Layout = window.ProfileLayout1;
  }
  return Layout ? <Layout {...props} /> : null;
}

window.Profile = Profile;
