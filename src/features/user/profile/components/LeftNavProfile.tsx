import {
  Avatar,
  Divider,
  Grid,
  GridItem,
  GridProps,
  HStack,
  Heading,
  IconProps,
  StackProps,
  Text,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react';
import { FC, Fragment, useMemo } from 'react';
import FeatherInbox from '../../../../shared/components/icons/feather/FeatherInbox';
import TbBuilding from '../../../../shared/components/icons/tabler/TbBuilding';
import TbLinkedIn from '../../../../shared/components/icons/tabler/TbLinkedIn';
import TbMapPin from '../../../../shared/components/icons/tabler/TbMapPin';
import Link from '../../../../shared/components/Link';
import { useNavOffset } from '../../../../shared/hooks/use-nav-offset';
import LeftNav, {
  ILeftNavProps
} from '../../../../shared/containers/navigation/LeftNav';
import { TUser } from '../../types/user';
import LeftNavProfileSkeleton from './LeftNavProfileSkeleton';
import { useAuthenticationContext } from '@atsnek/jaen';
import {
  AuthenticationContext,
  SnekUser
} from '@atsnek/jaen/dist/contexts/authentication';

export type TSocialLink = 'email' | 'linkedin' | 'location' | 'company';

const user: TUser = {
  displayName: 'Emily Brooks',
  username: 'emilybrooks',
  location: 'San Francisco, CA',
  // company: 'Snek',
  avatarUrl:
    'https://onedrive.live.com/embed?resid=AE2DDC816CEF3E1E%21220972&authkey=%21AIUh8CadUcYw3cg&width=999999&height=1024',
  bio: "Adventurous spirit with a knack for words and a passion for knowledge. Exploring the world of academia, one document at a time. Forever curious, forever learning. Let's dive into the realm of information together uncover the wonders of education.",
  socials: [
    {
      type: 'company',
      label: 'Snek',
      url: 'https://snek.at'
    },
    {
      type: 'email',
      label: 'emily.brooks@snek.at',
      url: 'mailto:emily.brooks@snek.at'
    },
    {
      type: 'linkedin',
      label: 'Emily-Brooks',
      url: 'https://www.linkedin.com/in/emily-brooks-1a2b3c4d/'
    },
    {
      type: 'location',
      label: 'San Francisco, CA'
    }
  ]
};

export const leftNavProfileStyling = {
  wrapperStack: {
    alignItems: { base: 'center', md: 'start' },
    textAlign: { base: 'center', md: 'left' }
  } as StackProps,
  avatar: {
    width: {
      base: '150px',
      md: 'full'
    },
    h: 'max-content'
  },
  userData: {
    stack: {
      alignItems: { base: 'center', md: 'start' },
      spacing: 0
    } as StackProps,
    displayName: {
      mt: 2
    }
  },
  bioDividers: {
    mt: 2
  },
  bio: {
    mt: 2
  },
  socialInfo: {
    grid: {
      templateColumns: { base: 'repeat(4, auto)', md: '1fr' },
      gap: { base: 4, md: 1 },
      my: { base: 2, md: 5 }
    } as GridProps,
    gridItems: {
      verticalAlign: 'middle',
      gap: { base: 0.5, md: 2 }
    }
  }
};

interface LeftNavProfileProps {
  userData: SnekUser | null;
}

/**
 * Sub-component of the profile page that displays the key information about the user.
 */
const LeftNavProfile: FC<LeftNavProfileProps> = ({ userData }) => {
  const socialLinkIcons: { [key in TSocialLink]: FC<IconProps> } = {
    email: FeatherInbox,
    linkedin: TbLinkedIn,
    location: TbMapPin,
    company: TbBuilding
  };

  const navTopOffset = useNavOffset();

  const hideControlsFallback = useBreakpointValue({ base: true, md: false });

  // const memoizedSocialLink = useMemo(() => {
  //   return user.socials?.map((data: any, idx: number) => {
  //     const { type, label } = data;
  //     const IconComp = socialLinkIcons[type as TSocialLink];
  //     return (
  //       <Fragment key={idx}>
  //         <GridItem
  //           {...leftNavProfileStyling.socialInfo.gridItems}
  //           as={HStack}
  //           // We currently display only the email link on mobile.
  //           display={{ base: type !== 'email' ? 'none' : 'flex', md: 'flex' }}
  //         >
  //           <IconComp
  //             strokeWidth={2.2}
  //             h="full"
  //             color="pages.userProfile.leftNav.socialLinks.icon.color"
  //           />
  //           {'url' in data ? (
  //             <Link
  //               href={data.url}
  //               _hover={{
  //                 color:
  //                   'pages.userProfile.leftNav.socialLinks.text.hover.color'
  //               }}
  //               transition="color 0.2s ease-in-out"
  //             >
  //               {label}
  //             </Link>
  //           ) : (
  //             <Text cursor="default">{label}</Text>
  //           )}
  //         </GridItem>
  //       </Fragment>
  //     );
  //   });
  // }, [userData?.socials]);

  const leftNavProps: ILeftNavProps = {
    hideControls: hideControlsFallback,
    isExpanded: true,
    h: {
      base: 'max-content',
      md: `calc(100vh - 50px - ${navTopOffset})`
    },
    top: `calc(20px + ${navTopOffset})`,
    minH: 'fit-content',
    w: 'full',
    mb: { base: 10, md: 0 }
  };

  if (!userData) {
    return (
      <LeftNav {...leftNavProps}>
        <LeftNavProfileSkeleton />
      </LeftNav>
    );
  }

  const displayName = `${userData.details?.firstName ?? ''} ${
    userData.details?.lastName ?? ''
  }`;

  return (
    <LeftNav {...leftNavProps}>
      <VStack
        {...leftNavProfileStyling.wrapperStack}
        __css={{
          '& img': {
            // We need this to force the image to be a square
            h: 'auto',
            aspectRatio: '1 / 1',
            objectPosition: 'top' //? Maybe we can make this configurable
          }
        }}
      >
        <Avatar
          {...leftNavProfileStyling.avatar}
          name={userData.username}
          src={userData.details?.avatarURL}
          aspectRatio={1}
          _hover={{
            boxShadow: 'rgba(0, 0, 0, 0.2) 6px 12px 28px -5px',
            transform: 'scale(1.02)'
          }}
          transition="box-shadow 0.2s cubic-bezier(.17,.67,.83,.67), transform 0.2s cubic-bezier(.17,.67,.83,.67)"
        />
        <VStack {...leftNavProfileStyling.userData.stack}>
          <Heading
            as="h6"
            fontSize="24px"
            {...leftNavProfileStyling.userData.displayName}
          >
            {displayName}
          </Heading>
          <Text
            fontSize="14px"
            color="pages.userProfile.leftNav.username.color.inactive"
            _hover={{
              color: 'pages.userProfile.leftNav.username.color.hover'
            }}
            transition="color 0.2s ease-in-out"
            cursor="pointer"
          >
            @{userData.username}
          </Text>
          {
            //* Maybe this would be a neat place to put the total amount of favs/likes, etc (some kind of stats)
          }
          <Divider {...leftNavProfileStyling.bioDividers} />
          <Text {...leftNavProfileStyling.bio}>{user.bio}</Text>
        </VStack>
        <Divider {...leftNavProfileStyling.bioDividers} />
        {/* <Grid {...leftNavProfileStyling.socialInfo.grid}>
          {memoizedSocialLink}
        </Grid> */}
      </VStack>
    </LeftNav>
  );
};

export default LeftNavProfile;
