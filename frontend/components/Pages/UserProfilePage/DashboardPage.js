import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native'
import { useNavigation, useEffect, createContext, useContext, useCallback } from "react";
import {
  Button,
  View,
  Text,
  Image,
  Box,
  Flex,
  ScrollView,
  Divider,
  VStack,
  Avatar,
  Center,
  Icon,
  Spinner,
  HStack,
  Pressable,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Page from "../../Shared/Page";
import ActionCard from "../ActionsPage/ActionCard";
import CommunityCard from "../CommunitySearchPage/CommunityCard";
import ActionsFilter from "../ActionsPage/ActionsFilter";
import { getActionMetric } from "../../Shared/Utils";
import { CommunityContext } from "../../Contexts/CommunityContext";
import { DashboardContext } from "../../Contexts/DashboardContext";
import { RefreshControl } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDashboardContext } from "../../Contexts/DashboardContext";
import { apiCall } from "../../../api/functions";
// import { convertAbsoluteToRem } from "native-base/lib/typescript/theme/tools";


const COMMUNITY = {
  id: 3,
  name: "Energize Wayland",
  subdomain: "wayland",
  website: "www.energizewayland.org",
  owner_name: "Kaat Vander Straeten",
  owner_email: "KAATvds@gmail.com",
  owner_phone_number: null,
  goal: {
    id: 2,
    name: "Energize Wayland-Goal",
    description: "",
    target_number_of_households: 1200,
    target_number_of_actions: 5000,
    target_carbon_footprint_reduction: 3000000,
    initial_number_of_households: 131,
    initial_number_of_actions: 0,
    initial_carbon_footprint_reduction: 0,
    attained_number_of_households: 360,
    attained_number_of_actions: 1769,
    attained_carbon_footprint_reduction: 0,
    organic_attained_number_of_households: 295,
    organic_attained_number_of_actions: 1381,
    organic_attained_carbon_footprint_reduction: 2108429,
    target_date: null,
    more_info: null,
  },
  about_community: "If anyone can do it, Wayland can!",
  logo: {
    id: 5,
    name: "Energize Wayland CommunityLogo",
    url: "https://massenergize-prod-files.s3.amazonaws.com/media/energizewayland_resized.jpg",
  },
  favicon: null,
  location: {
    city: "Wayland",
    unit: null,
    state: "Massachusetts",
    address: null,
    country: "US",
    zipcode: "01778",
  },
  is_approved: true,
  is_published: true,
  is_geographically_focused: true,
  banner: null,
  created_at: "2019-12-17T15:03:49.115Z",
  updated_at: "2021-02-05T22:50:09.647Z",
  more_info:
    '{"wants_socials":"true","facebook_link":"https://www.facebook.com/EnergizeWayland"}',
  admins: [
    {
      id: "d0e6ca3e-413b-4dba-b139-6fdbaff58e6a",
      full_name: "Kaat Vander Straeten",
      preferred_name: "Kaat-alyst",
      email: "kaat@transitionwayland.org",
      is_super_admin: false,
      is_community_admin: true,
      joined: "2019-12-19",
      user_info: null,
      profile_picture: null,
      communities: [
        "Global Climate Corps",
        "EcoNatick",
        "Demo 2023",
        "Energize Wayland",
      ],
      households: [
        {
          id: 11,
          name: "MWED",
          unit_type: "RESIDENTIAL",
          community: 3,
          location: {
            id: 5,
            location_type: "ZIP_CODE_ONLY",
            street: "",
            unit_number: "",
            zipcode: "01778",
            city: "Wayland",
            county: "",
            is_deleted: false,
            state: "",
            country: "US",
            more_info: null,
          },
          address: 5,
          is_deleted: false,
        },
        {
          id: 351,
          name: "RSL",
          unit_type: "RESIDENTIAL",
          community: 3,
          location: {
            id: 5,
            location_type: "ZIP_CODE_ONLY",
            street: "",
            unit_number: "",
            zipcode: "01778",
            city: "Wayland",
            county: "",
            is_deleted: false,
            state: "",
            country: "US",
            more_info: null,
          },
          address: 5,
          is_deleted: false,
        },
      ],
      is_guest: false,
      preferences: {
        user_portal_settings: {
          communication_prefs: {
            update_frequency: {
              per_week: {
                value: true,
              },
            },
            news_letter: {
              as_posted: {
                value: true,
              },
            },
            messaging: {
              yes: {
                value: true,
              },
            },
          },
          notifications: {
            upcoming_events: {
              never: {
                value: true,
              },
            },
            upcoming_actions: {
              never: {
                value: true,
              },
            },
            news_teams: {
              never: {
                value: true,
              },
            },
            new_testimonials: {
              never: {
                value: true,
              },
            },
            your_activity_updates: {
              never: {
                value: true,
              },
            },
          },
        },
        admin_portal_settings: {
          communication_prefs: {
            reports_frequency: {
              weekly: {
                value: true,
              },
            },
            user_updates: {
              by_email_only: {
                value: true,
              },
            },
            specific_notifications: {
              new_member_update: {
                value: true,
              },
              new_action_creation_update: {
                value: true,
              },
              event_RSVP_update: {
                value: false,
              },
              new_event_creation_update: {
                value: true,
              },
              new_testimonial_submission_update: {
                value: true,
              },
              new_team_submission_update: {
                value: true,
              },
            },
          },
        },
      },
      accepts_terms_and_conditions: true,
    },
    {
      id: "43929ba4-ad30-4c82-89c8-b1751740f61f",
      full_name: "Stephen Breit",
      preferred_name: "Steve",
      email: "steve.breit@outlook.com",
      is_super_admin: false,
      is_community_admin: true,
      joined: "2019-12-18",
      user_info: null,
      profile_picture: null,
      communities: [
        "Jewish Climate Action Network -- JCAN-MA",
        "EnergizeUs",
        "Energize Wayland",
      ],
      households: [
        {
          id: 8,
          name: "54RVR",
          unit_type: "RESIDENTIAL",
          community: 3,
          location: {
            id: 226,
            location_type: "FULL_ADDRESS",
            street: "54 rich valley rd",
            unit_number: "",
            zipcode: "01778",
            city: "Wayland",
            county: "",
            is_deleted: false,
            state: "MA",
            country: "US",
            more_info: null,
          },
          address: 226,
          is_deleted: false,
        },
      ],
      is_guest: false,
      preferences: {
        user_portal_settings: {
          communication_prefs: {
            update_frequency: {
              per_week: {
                value: true,
              },
            },
            news_letter: {
              as_posted: {
                value: true,
              },
            },
            messaging: {
              yes: {
                value: true,
              },
            },
          },
          notifications: {
            upcoming_events: {
              never: {
                value: true,
              },
            },
            upcoming_actions: {
              never: {
                value: true,
              },
            },
            news_teams: {
              never: {
                value: true,
              },
            },
            new_testimonials: {
              never: {
                value: true,
              },
            },
            your_activity_updates: {
              never: {
                value: true,
              },
            },
          },
        },
        admin_portal_settings: {
          communication_prefs: {
            reports_frequency: {
              weekly: {
                value: true,
              },
            },
            user_updates: {
              by_email_only: {
                value: true,
              },
            },
            specific_notifications: {
              new_member_update: {
                value: true,
              },
              new_action_creation_update: {
                value: true,
              },
              event_RSVP_update: {
                value: false,
              },
              new_event_creation_update: {
                value: true,
              },
              new_testimonial_submission_update: {
                value: true,
              },
              new_team_submission_update: {
                value: true,
              },
            },
          },
        },
      },
      accepts_terms_and_conditions: true,
    },
    {
      id: "c3bc9499-d344-4512-aa06-3200894b3dab",
      full_name: "Ellen Tohn",
      preferred_name: "Ellen T.",
      email: "ellentohn@gmail.com",
      is_super_admin: false,
      is_community_admin: false,
      joined: "2019-12-17",
      user_info: null,
      profile_picture: null,
      communities: [
        "Jewish Climate Action Network -- JCAN-MA",
        "Energize Wayland",
      ],
      households: [
        {
          id: 4,
          name: "Home",
          unit_type: "RESIDENTIAL",
          community: 3,
          location: {
            id: 5,
            location_type: "ZIP_CODE_ONLY",
            street: "",
            unit_number: "",
            zipcode: "01778",
            city: "Wayland",
            county: "",
            is_deleted: false,
            state: "",
            country: "US",
            more_info: null,
          },
          address: 5,
          is_deleted: false,
        },
      ],
      is_guest: false,
      preferences: {
        user_portal_settings: {
          communication_prefs: {
            update_frequency: {
              per_week: {
                value: true,
              },
            },
            news_letter: {
              as_posted: {
                value: true,
              },
            },
            messaging: {
              yes: {
                value: true,
              },
            },
          },
          notifications: {
            upcoming_events: {
              never: {
                value: true,
              },
            },
            upcoming_actions: {
              never: {
                value: true,
              },
            },
            news_teams: {
              never: {
                value: true,
              },
            },
            new_testimonials: {
              never: {
                value: true,
              },
            },
            your_activity_updates: {
              never: {
                value: true,
              },
            },
          },
        },
        admin_portal_settings: {
          communication_prefs: {
            reports_frequency: {
              weekly: {
                value: true,
              },
            },
            user_updates: {
              by_email_only: {
                value: true,
              },
            },
            specific_notifications: {
              new_member_update: {
                value: true,
              },
              new_action_creation_update: {
                value: true,
              },
              event_RSVP_update: {
                value: false,
              },
              new_event_creation_update: {
                value: true,
              },
              new_testimonial_submission_update: {
                value: true,
              },
              new_team_submission_update: {
                value: true,
              },
            },
          },
        },
      },
      accepts_terms_and_conditions: true,
    },
  ],
  geography_type: "ZIPCODE",
  locations: "01778",
  feature_flags: [
    {
      id: 7,
      name: "weekly_event_nudge",
      scope: "BACKEND",
      audience: "EVERYONE",
      user_audience: "EVERYONE",
      key: "weekly_event_nudge-feature-flag",
      notes: "Send a weekly nudge to cadmins",
      expires_on: null,
      communities: [
        {
          id: 3,
          name: "Energize Wayland",
        },
        {
          id: 7,
          name: "Energize Framingham",
        },
        {
          id: 6,
          name: "Cooler Concord",
        },
      ],
    },
    {
      id: 8,
      name: "new-user-engagement-view",
      scope: "ADMIN_FRONTEND",
      audience: "EVERYONE",
      user_audience: "EVERYONE",
      key: "new-user-engagement-view-feature-flag",
      notes: "Admin portal shows new user engagement view",
      expires_on: null,
      communities: [],
    },
  ],
  is_demo: false,
};

const ACTION = {
  id: 4,
  title: "NO COST home energy assessment",
  is_global: false,
  featured_summary: "Home energy Assessment",
  steps_to_take:
    '<p><strong>How? Super easy</strong></p>\r\n<ol>\r\n<li><strong><img src="https://massenergize-prod-files.s3.amazonaws.com/media/Untitled_500__100_px_7-230518-003039.jpg" alt="" width="50" height="50" />Schedule</strong> your no-cost home energy assessment through <a href="http://www.waylandsavesenergy.org/" target="_blank" rel="noopener">Wayland Saves Energy</a>.</li>\r\n<li><strong>Need some local help?</strong><strong>&nbsp;</strong>Our Home Energy coaches are Anne Harris, Paul Dale, and Ellen Tohn. Fill in <a href="https://www.massenergize.org/home-energy-assessment-coach/">this form</a>&nbsp;to request their help.&nbsp;</li>\r\n<li><strong>Let us know </strong>how if goes either be <a href="https://www.energizewayland.org/contactus" target="_blank" rel="noopener">contacting us</a>, or signing up and <a href="https://www.energizewayland.org/testimonials" target="_blank" rel="noopener">leaving a testimonial</a>!</li>\r\n</ol>',
  deep_dive:
    '<p><strong><span style="color: #000000; font-size: 14pt;"><span style="color: #000000; font-family: Arial;"><img src="https://massenergize-prod-files.s3.amazonaws.com/media/Untitled_design-230517-202905.jpg" alt="" width="50" height="50" /> </span>Financial incentives for follow-up work</span></strong></p>\r\n<p>&nbsp;</p>\r\n<ol>\r\n<li><span style="color: #000000;">The Assessment itself is no cost.</span></li>\r\n<li><span style="color: #000000;">For follow up work, please visit </span><span style="color: #000000;"><a style="color: #000000;" href="https://www.energy.gov/policy/articles/making-our-homes-more-efficient-clean-energy-tax-credits-consumers">THIS</a> and&nbsp;<a style="color: #000000;" href="https://www.irs.gov/pub/taxpros/fs-2022-40.pdf">THIS</a> page from the IRS. No worries, your Assessor will explain all the incentives. </span></li>\r\n<li><span style="color: #000000;">Again, need help? </span>Fill in <a href="https://www.massenergize.org/home-energy-assessment-coach/">this form</a> to request help from Wayland home energy coaches (all volunteers).</li>\r\n</ol>\r\n<p>&nbsp;</p>\r\n<p><img src="https://massenergize-prod-files.s3.amazonaws.com/media/Untitled_500__100_px_4-230518-001538.jpg" alt="" width="50" height="30" /> <span style="font-size: 14pt;"><strong>The letter from the Town </strong></span></p>\r\n<p>&nbsp;</p>\r\n<p>The partnership with Al In Energy through an MOU was anounced in a letter to all residents from J<span style="font-weight: 400;">ohn </span><span style="font-weight: 400;">Bugbee, </span><span style="font-weight: 400;">Acting </span><span style="font-weight: 400;">Town </span><span style="font-weight: 400;">Manager</span>. The letter is reproduced below:</p>\r\n<p>&nbsp;</p>\r\n<p><span style="font-weight: 400;">Dear Wayland Homeowner or Renter,&nbsp;</span></p>\r\n<p><span style="font-weight: 400;">I am pleased to announce </span><span style="font-weight: 400;">&ldquo;</span><span style="font-weight: 400;">Wayland Saves Energy&rdquo;, a new partnership between the Town of Wayland and All In Energy, a Massachusetts nonprofit</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">to connect residents to enhanced no</span><span style="font-weight: 400;">-</span><span style="font-weight: 400;">cost Home Energy Assessments to help you upgrade your home\'s energy performance, save money, improve your home\'s comfort, and help Wayland meet its climate goals</span><span style="font-weight: 400;">.&nbsp;</span></p>\r\n<p><span style="font-weight: 400;">Homeowners can take advantage of generous new financial incentives for heat pumps and increased incentives for insulation by scheduling a no</span><span style="font-weight: 400;">-</span><span style="font-weight: 400;">cost Home Energy Assessment</span><span style="font-weight: 400;">. </span><span style="font-weight: 400;">Heat pump systems can be used to both heat and cool your entire home more efficiently than traditional systems, without relying on the use of fossil fuels, such as natural gas and oil. The Home Energy Assessments are provided by a Mass Save Home Performance Contractor at no cost to you and will identify energy saving measures in your home and relevant financial incentives</span><span style="font-weight: 400;">.&nbsp;</span></p>\r\n<p><span style="font-weight: 400;">If you\'ve had a Home Energy Assessment more than two years ago you might think you don\'t need another</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">but here are some reasons to consider one:&nbsp;</span></p>\r\n<p><span style="font-weight: 400;">Up to a </span><span style="font-weight: 400;">$</span><span style="font-weight: 400;">15,000 rebate for heat </span><span style="font-weight: 400;">pumps for heating and cooling; you must complete a no</span><span style="font-weight: 400;">-</span><span style="font-weight: 400;">cost </span><span style="font-weight: 400;">Home Energy Assessment and the </span><span style="font-weight: 400;">recommended weatherization upgrades to be eligible for the </span><span style="font-weight: 400;">highest level of incentives</span><span style="font-weight: 400;">.&nbsp;</span></p>\r\n<ul>\r\n<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">0% financing for energy efficiency home upgrades through the Mass Save HEAT Loan program</span><span style="font-weight: 400;">.&nbsp;</span></li>\r\n<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Over time, new leaks and drafts may develop or insulation may settle</span><span style="font-weight: 400;">, </span><span style="font-weight: 400;">requiring additional air sealing or insulation. The Mass Save programs no longer have a cap on the insulation </span><span style="font-weight: 400;">costs that </span><span style="font-weight: 400;">can be covered, which can be up to 75% of the total, or up to 100% for renters.&nbsp;</span></li>\r\n<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Learn if you would be a good candidate for heat pumps or solar.&nbsp;</span></li>\r\n<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Get connected to a volunteer coach from Wayland to answer your questions </span><span style="font-weight: 400;">about home energy </span><span style="font-weight: 400;">upgrades, solar, or electric cars, bikes, or lawn equipment.&nbsp;</span></li>\r\n</ul>\r\n<p><span style="font-weight: 400;">To schedule a no</span><span style="font-weight: 400;">-</span><span style="font-weight: 400;">cost Home Energy Assessment, call All In Energy at (508)456-9876 or visit www.WaylandSavesEnergy.org&nbsp;</span></p>\r\n<p><span style="font-weight: 400;">The Town of Wayland and All In Energy look forward to helping you make your home more comfortable, affordable, and sustainable and move Wayland toward its Town climate goals</span><span style="font-weight: 400;">. </span></p>\r\n<p>&nbsp;</p>',
  about:
    '<p dir="ltr"><span style="color: #000000; font-family: Arial;">The Wayland Saves Energy campaign has been super popular so far. Over 160 Waylanders signed up! But there are still so many households <strong>missing out</strong> on this NO COST Home Energy Assessment. </span></p>\r\n<p dir="ltr">&nbsp;</p>\r\n<p dir="ltr"><span style="color: #000000; font-family: Arial;">Are you one of them? If you have not had a MassSave audit in the last 3 years, check it out.</span></p>\r\n<p dir="ltr">&nbsp;</p>\r\n<p><strong>Why do an assessment of your home and energy systems?&nbsp;</strong></p>\r\n<ol>\r\n<li><span style="font-size: 12pt;">Lower your energy bills!</span></li>\r\n<li><span style="font-size: 12pt;">Get rid of energy inefficiencies in your home, cold drafts, moisture or mold</span></li>\r\n<li><span style="font-size: 12pt;">Improve temperature control</span></li>\r\n<li><span style="font-size: 12pt;">Insulate against noise</span></li>\r\n<li><span style="font-size: 12pt;">Address problems with ice dams and other structural concerns</span></li>\r\n<li><span style="font-size: 12pt;">Adrress allergies, asthma, or heat related health issues</span></li>\r\n<li><span style="font-size: 12pt;">Lower your carbon footprint</span></li>\r\n</ol>\r\n<p dir="ltr">&nbsp;</p>\r\n<p dir="ltr"><strong><img src="https://massenergize-prod-files.s3.amazonaws.com/media/Untitled_500__100_px_7-230518-003039.jpg" alt="" width="50" height="50" /> &nbsp;How? Schedule</strong>&nbsp;through <a href="http://www.waylandsavesenergy.org/" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=http://www.waylandsavesenergy.org/&amp;source=gmail&amp;ust=1670681631374000&amp;usg=AOvVaw0eJ3ni8q4jFS9zkgdGB4sj">Wayland Saves Energy</a>!&nbsp;&nbsp;</p>\r\n<p dir="ltr">&nbsp;</p>\r\n<p dir="ltr"><span style="color: #000000; font-family: Arial;"><img src="https://massenergize-prod-files.s3.amazonaws.com/media/Untitled_design-230517-202905.jpg" alt="" width="50" height="50" />It\'s<em>&nbsp;<strong>no</strong></em><strong> cost a</strong></span><span style="color: #000000; font-family: Arial;">nd </span><strong>opens the door to big savings</strong> on home energy upgrades, like</p>\r\n<p dir="ltr">&nbsp;</p>\r\n<p style="text-align: center;"><strong><span style="color: #e67e23;">$15,000 off heat pumps for heating and cooling </span></strong></p>\r\n<p style="text-align: center;"><strong><span style="color: #e67e23;">75% off insulation&nbsp;</span></strong></p>\r\n<p style="text-align: center;"><span style="color: #e67e23;"><strong>NEW federal tax credits for 30% of the costs of heat pumps, heat pump hot water heaters, insulation, solar, windows, and more</strong></span></p>\r\n<p style="text-align: center;">&nbsp;</p>\r\n<p style="text-align: center;"><span style="color: #000000;">Find out more under the Deep Dive tab above</span></p>\r\n<p style="text-align: center;">&nbsp;</p>\r\n<p style="text-align: left;"><span style="color: #000000;"><a href="http://www.waylandsavesenergy.org/" target="_blank" rel="noopener">Wayland Saves Energy</a> is a partnership between the <strong>Town of Wayland </strong>and <a href="https://allinenergy.org/index.html" target="_blank" rel="noopener">All In Energy</a> (Read the letter under the Deep Dive tab above)</span></p>',
  icon: "",
  average_carbon_score: "",
  rank: 40,
  is_deleted: false,
  is_published: true,
  is_approved: true,
  image: {
    id: 3378,
    name: "Media library upload-(1684441516428)",
    url: "https://massenergize-prod-files.s3.amazonaws.com/media/action_image_home_energy_assessment-230518-202516.jpg",
  },
  calculator_action: {
    id: 2,
    name: "energy_audit",
    title: "",
    category: "",
    description:
      "Sign up for an energy audit, offered free from MassSave and most local utilities",
    average_points: 15,
  },
  tags: [
    {
      id: 5,
      name: "Home Energy",
      points: null,
      icon: "",
      tag_collection: 1,
      rank: 1,
      is_deleted: false,
      is_published: false,
      order: 1,
      tag_collection_name: "Category",
    },
    {
      id: 20,
      name: "Low",
      points: 1,
      icon: "",
      tag_collection: 3,
      rank: 1,
      is_deleted: false,
      is_published: false,
      order: 1,
      tag_collection_name: "Impact",
    },
    {
      id: 17,
      name: "0",
      points: 0,
      icon: "",
      tag_collection: 2,
      rank: 1,
      is_deleted: false,
      is_published: false,
      order: 1,
      tag_collection_name: "Cost",
    },
    {
      id: 29,
      name: "Homeowner",
      points: null,
      icon: "",
      tag_collection: 4,
      rank: 1,
      is_deleted: false,
      is_published: false,
      order: 1,
      tag_collection_name: "I am a...",
    },
    {
      id: 30,
      name: "Renter",
      points: null,
      icon: "",
      tag_collection: 4,
      rank: 2,
      is_deleted: false,
      is_published: false,
      order: 2,
      tag_collection_name: "I am a...",
    },
    {
      id: 31,
      name: "Condo",
      points: null,
      icon: "",
      tag_collection: 4,
      rank: 3,
      is_deleted: false,
      is_published: false,
      order: 3,
      tag_collection_name: "I am a...",
    },
  ],
  community: {
    id: 3,
    name: "Energize Wayland",
    subdomain: "wayland",
  },
  created_at: "2019-12-17T18:11:13.500Z",
  updated_at: "2023-05-18T20:25:17.376Z",
  vendors: [
    {
      id: 2,
      name: "HomeWorks Energy",
      phone_number: "(781)305-3319",
      email: "info@homeworksenergy.com",
      key_contact: {
        name: "??",
        email: "??",
      },
      service_area: "statewide",
      logo: {
        id: 76,
        name: "Logo-homeworks-energy",
        url: "https://massenergize-prod-files.s3.amazonaws.com/media/hwe_webheader.png",
      },
    },
  ],
};

const ProfileName = ({ navigation, communityInfo }) => {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRir06bApyiBCEsxHMGNWtcxEZGCLYj5vdcxQ&usqp=CAU",
        }}
        alt="User avatar"
        size="20"
        rounded="full"
      />
      <Box alignItems="center">
        <Text fontSize="xl">Your Name</Text>
        <Text>{communityInfo.name}</Text>
      </Box>
      <Pressable onPress={() => navigation.navigate("settings")}>
        <Icon as={FontAwesome} name="cog" size="lg" />
      </Pressable>
    </Flex>
  );
};

const SustainScore = () => {
  return (
    <Box>
      <Text fontSize="4xl" color="primary.400" textAlign="center">
        0.0
      </Text>
      <Text fontSize="lg" fontWeight="light" textAlign="center">
        Sustainability Score
      </Text>
    </Box>
  );
};

const CarbonSaved = () => {
  return (
    <Flex flexDirection="row" justifyContent="space-evenly" width="full">
      <Box alignItems="center">
        <Text fontSize="lg" fontWeight="medium">
          0
        </Text>
        <Text>CO2 Saved</Text>
      </Box>
      <Divider orientation="vertical" />
      <Box alignItems="center">
        <Text fontSize="lg" fontWeight="medium">
          0
        </Text>
        <Text>Trees</Text>
      </Box>
      <Divider orientation="vertical" />
      <Box alignItems="center">
        <Text fontSize="lg" fontWeight="medium">
          0
        </Text>
        <Text>Points</Text>
      </Box>
    </Flex>
  );
};

const ActionsList = ({ navigation, list }) => {
  const todoList = list;
  // const { actions } = userInfo.completedList;
  const { actions } = useContext(CommunityContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (todoList) {
      setIsLoading(false);
    }
  }, []);  
  // const actions = useContext(CommunityContext);
  // const [actions, setActions] = useState([
  //   ACTION,
  //   ACTION,
  //   ACTION,
  //   ACTION,
  //   ACTION,
  //   ACTION,
  // ]);

  return (
    <Box>
      <ActionsFilter />
      <ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={2} justifyContent="center" mx={15} marginBottom={15}>
              {todoList.map((action, index) => {
                return (
                  <ActionCard
                    key={index}
                    navigation={navigation}
                    id={action.id}
                    title={action.title}
                    imgUrl={action.image?.url}
                    impactMetric={getActionMetric(action, "Impact")}
                    costMetric={getActionMetric(action, "Cost")}
                  />
                );
              })}
            </HStack>
          </ScrollView>
      </ScrollView>
    </Box>
  );
};

const BadgesList = () => {
  return (
    <Center>
      <Text fontSize="lg" fontWeight="bold" mb="5">
        Badges
      </Text>
      <Avatar.Group max={3}>
        <Avatar
          ACTION
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
        <Avatar
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
        <Avatar
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
        <Avatar
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
        <Avatar
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
        <Avatar
          bg="primary.400"
          size="lg"
          source={{
            uri: "https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg",
          }}
        >
          Monkey
        </Avatar>
      </Avatar.Group>
    </Center>
  );
};

const TeamsList = () => {
  return (
    <Center>
      <Text fontWeight="bold" fontSize="lg" mb="5">
        My Teams
      </Text>
      <Flex width="full">
        <Flex flexDirection="row" alignItems="center">
          <Icon as={FontAwesome} name="home" size="sm" />
          <Text px="2" flexGrow={1}>
            Team 1
          </Text>
          <Icon as={FontAwesome} name="pencil" size="sm" />
        </Flex>
      </Flex>
    </Center>
  );
};

const HousesList = () => {
  return (
    <Center>
      <Text fontWeight="bold" fontSize="lg" mb="5">
        My Households
      </Text>
      <Flex width="full">
        <Flex flexDirection="row" alignItems="center">
          <Icon as={FontAwesome} name="home" size="sm" />
          <Text px="2" flexGrow={1}>
            Household 1
          </Text>
          <Icon as={FontAwesome} name="pencil" size="sm" />
        </Flex>
      </Flex>
    </Center>
  );
};

const CommunitiesList = ({ communityInfo }) => {
  const [communities, setCommunities] = useState([communityInfo]);

  return (
    <Center>
      <Text fontWeight="bold" fontSize="lg" mb="5">
        My Communities
      </Text>
      <VStack space={2}>
        {communities &&
          communities.map((community, index) => {
            return <CommunityCard community={community} key={index} />;
          })}
      </VStack>
    </Center>
  );
};

export default function DashboardPage({ navigation, route }) {
  const { dashboardInfo, userInfo, infoLoaded, todoList, eventsList, householdsList, fetchDashboardInfo } = useContext(DashboardContext);
  const [toDoList, setToDoList] = useState([]);

  const [userEmail, setUserEmail] = useState("");
  apiCall("users.info").then((json) => {
    if (json.success) {
      setUserEmail(json.data.email);
      console.log("Fetched email: ", userEmail, " Completed")
    } else {
      console.log("User Info Failed");
      console.log(json);
      if (callBackFn) callBackFn(null, json.error);
    }
  });
  apiCall("users.actions.todo.list").then((json) => {
    if (json.success) {
      console.log(json.data);
      const actionTitles = json.data.map(item=>item.action.title);
      console.log(json.data[0].action.title);
      console.log("Todo List Fetched");
      setToDoList(actionTitles);
      // console.log(toDoList.length);
    } else {
      console.log("Action Todo List Failed");
      console.log(json);
      if (callBackFn) callBackFn(null, json.error);
    }
  });
  console.log(toDoList.length);
  console.log(userEmail);

  const { communityInfo } = useContext(CommunityContext);
  // // const { todoList, fetchDashboardInfo } = useContext(DashboardContext);
  // // fetchDashboardInfo();

  // // const { email } = email
  // // const { userInfo, todoList, fetchDashboardInfo } = useContext(DashboardContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback (() => {
    setRefreshing(false);
    // todoList = useContext(DashboardContext);
    // // userInfo = useContext(DashboardContext);
    // // infoLoaded = useContext(DashboardContext);
    // // todoList = useContext(DashboardContext);  
    // // eventsList = useContext(DashboardContext);
    // // householdsList = useContext(DashboardContext);

    fetchDashboardInfo(() => setRefreshing(false))
    setTimeout(() => setRefreshing(false), 10000);
  }, []);
  //   fetchCommunityInfo(community_id, () => setRefreshing(false))
  //   // setTimeout(() => setRefreshing(false), 2000);
  // }, []);


  // // const route = useRoute();
  // const userEmail = route.params?.userEmail;
  // console.log(userEmail);
  // const {
  //   todoList,
  //   dashboardInfo,
  //   householdsList,
  //   eventsList,
  //   userInfo,
  //   infoLoaded,
  //   fetchDashboardInfo
  // } = useDashboardContext();

  // useEffect(() => {
  //   fetchDashboardInfo(userEmail);
  // }, [userEmail]);


  return (
    <GestureHandlerRootView backgroundColor="white" flex="1">
      <ScrollView  padding="5"
      nestedScrollEnabled = {true} 
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
        <VStack space={10} mb="20">
          <ProfileName navigation={navigation} communityInfo = {communityInfo} /*userInfo={userInfo}*//>
          <SustainScore />
          <CarbonSaved />
          <ActionsList navigation={navigation} list = {toDoList}/>
          <BadgesList />
          <TeamsList />
          <HousesList />
          <CommunitiesList communityInfo = {communityInfo}/>
          {/* <View>
            <Text>User Info: {dashboardInfo ? dashboardInfo.name : 'Loading...'}</Text>
            <Text>Todo List Length: {todoList.length}</Text>
            <Text>Households List Length: {householdsList.length}</Text>
            <Text>Events List Length: {eventsList.length}</Text>
            <Text>User Info Value: {userInfo}</Text>
            <Text>Info Loaded Value: {infoLoaded}</Text>
            <Button title="Fetch Dashboard Info" onPress={() => fetchDashboardInfo(userEmail)} />
          </View> */}
        </VStack>
      </ScrollView>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  scroll: {
    height: "80",
  },
  category: {
    padding: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
});