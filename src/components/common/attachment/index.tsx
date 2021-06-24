import { IconButton, Grid, Tooltip } from '@material-ui/core';
import { CloudDownload as CloudDownloadIcon } from '@material-ui/icons';
import useBackendServiceCallback from 'hooks/useBackendServiceCallback';
import fileService from 'services/file';
import Spin from 'ui/spin';

interface AttachmentProps {
  fileName: string;
}

const Attachment: React.FC<AttachmentProps> = ({ fileName }) => {
  const [{ loading }, downloadFile] = useBackendServiceCallback(
    fileService.downLoadFile,
  );
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    downloadFile(fileName);
  };

  return (
    <Grid container alignItems="center">
      <Spin loading={loading} size={18}>
        <Tooltip title="Tải xuống">
          <IconButton size="small" onClick={handleClick}>
            <CloudDownloadIcon />
          </IconButton>
        </Tooltip>
      </Spin>
    </Grid>
  );
};

export default Attachment;
