import { useRouter } from 'next/router';
import Anime from '../anime';

const AnimePage = () => {
    const router = useRouter();
    const { id } = router.query;

    return <Anime animeId={id} />;
};

export default AnimePage;
